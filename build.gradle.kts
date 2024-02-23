plugins {
    id("global.genesis.pbc") version "7.2.0-SNAPSHOT"
}

tasks {
    val tasks = listOf("clean", "assemble", "check", "build")
    for(taskName in tasks){
        named(taskName){
            gradle.includedBuilds.forEach {
                dependsOn(it.task(":$taskName"))
            }
        }
    }
}
