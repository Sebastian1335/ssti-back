import { Server } from "./presentation/server"
import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
(() => {
    main()
})()

function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.Start()
}

