ext.set("localDaogenVersion", "{{localGenId}}")

plugins {
    `maven-publish`
    kotlin("jvm")
    id("org.jlleitschuh.gradle.ktlint") version "11.6.1"
    id("com.jfrog.artifactory")
    id("org.sonarqube") version "5"
}

sonarqube {
    properties {
        property("sonar.projectKey", "{{pkgScope}}_{{repoName}}")
        property("sonar.projectName", "pbc-{{appName}}-server")
        property("sonar.organization", "{{pkgScope}}")
        property("sonar.host.url", "https://sonarcloud.io")
        property("sonar.sourceEncoding", "UTF-8")
    }
}

project(":{{appName}}-app") {
    sonarqube {
        properties {
            property("sonar.sources", "src/main")
        }
    }
}

subprojects {
    apply(plugin = "org.gradle.maven-publish")
    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "org.jlleitschuh.gradle.ktlint")
    apply(plugin = "com.jfrog.artifactory")
    apply(plugin = "org.sonarqube")

    ktlint {
        filter {
            exclude { element -> element.file.path.contains("generated") || element.file.path.contains("internal-modules") }
        }
    }

    dependencies {
        testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
        implementation("com.h2database:h2:2.2.224")
    }
    tasks {
        test {
            useJUnitPlatform()
        }
        withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
            kotlinOptions {
                freeCompilerArgs = listOf("-Xjsr305=strict", "-Xjvm-default=all")
                jvmTarget = "17"
            }
        }
    }
}

tasks {
    assemble {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("assemble"))
        }
    }
    build {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("build"))
        }
    }
    clean {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("clean"))
        }
    }
    ktlintFormat {
        for (subproject in subprojects) {
            dependsOn(subproject.tasks.named("ktlintFormat"))
        }
    }
}

allprojects {

    group = "{{groupId}}"


    kotlin {
        jvmToolchain {
            (this as JavaToolchainSpec).languageVersion.set(JavaLanguageVersion.of(17))
        }
    }
    tasks.withType<Jar> {
        duplicatesStrategy = DuplicatesStrategy.WARN
    }

    java {
        toolchain {
            languageVersion.set(JavaLanguageVersion.of(17))
        }
    }

    repositories {
        mavenLocal {
            // VERY IMPORTANT!!! EXCLUDE AGRONA AS IT IS A POM DEPENDENCY AND DOES NOT PLAY NICELY WITH MAVEN LOCAL!
            content {
                excludeGroup("org.agrona")
            }
        }
        mavenCentral()
        maven {
            val repoUrl = if (properties["clientSpecific"] == "true") {
                "https://genesisglobal.jfrog.io/genesisglobal/libs-release-client"
            } else {
                "https://genesisglobal.jfrog.io/genesisglobal/dev-repo"
            }
            url = uri(repoUrl)
            credentials {
                username = properties["genesisArtifactoryUser"].toString()
                password = properties["genesisArtifactoryPassword"].toString()
            }
        }
    }

    publishing {
        publications.create<MavenPublication>("maven") {
            from(components["java"])
        }
    }
}
