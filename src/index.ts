#!/usr/bin/env node

import {Calil} from "./Calil";
import * as config from "../config.json";

const main = async () => {
    const calil = new Calil(config.SECRET_KEY);
    const books = await calil.check('4834000826','Aomori_Pref');
    const cities = await calil.getAllCities('愛知県');
}

main();

// import {Cli} from "./Cli";
// const rootDirPath = __dirname + '/../';
// const cli = new Cli();
// cli.cli(process.argv);

