import { Router } from "express";
import { readdirSync } from "fs";
const PATH_ROUTER = `${__dirname}`
const router = Router()

const parseFileName = (filename: string) => {
	const parsed = filename.split(".").shift()
	return parsed
}

readdirSync(PATH_ROUTER).filter((filename) => {
	if (filename === "index.ts") return

	const parsedName = parseFileName(filename)

	import(`./${parsedName}`).then((moduleRouter) => {
		console.log(`CARGANDO RUTA: ${parsedName}`)
		router.use(`/${parsedName}`,moduleRouter.router)
	})
})

export { router }