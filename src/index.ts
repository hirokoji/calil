#!/usr/bin/env node

import {Calil} from "./Calil";
import * as config from "../config.json";


const main = async () => {
    const calil = new Calil(config.SECRET_KEY);
    await calil.check('4834000826','Aomori_Pref');
}

main();

// import {Cli} from "./Cli";
// const rootDirPath = __dirname + '/../';
// const cli = new Cli();
// cli.cli(process.argv);



