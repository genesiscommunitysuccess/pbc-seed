plugins {
    id("global.genesis.pbc")
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
