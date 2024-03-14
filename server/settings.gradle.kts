import global.genesis.gradle.plugin.simple.ProjectType

rootProject.name = "genesisproduct-{{appName}}"

pluginManagement {
    val genesisVersion: String by settings

    plugins {
        id("global.genesis.settings") version genesisVersion
    }

    repositories {
        mavenCentral()
        gradlePluginPortal()
        maven {
            url = uri("https://genesisglobal.jfrog.io/genesisglobal/dev-repo")
            credentials {
                username = extra.properties["genesisArtifactoryUser"].toString()
                password = extra.properties["genesisArtifactoryPassword"].toString()
            }
        }
        mavenLocal {
        }
    }
}

plugins {
    id("global.genesis.settings")
}

genesis {
    projectType = ProjectType.PBC
}


include("{{appName}}-app")
