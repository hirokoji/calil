#!/usr/bin/env node

import {Calil} from "./Calil";
import * as config from "../config.json";

const main = async () => {

    const calil = new Calil(config.SECRET_KEY);

    const pref = '愛知県';
    const cities = await calil.getAllCities(pref);
    const city = cities['な'][1];

    const libraries = await calil.getLibraries(pref, city);
    const systemid = libraries[4].systemid;

    const isbn = '4834000826';
    const books = await calil.checkBookAvailability(isbn, systemid);
    console.log(books);
}

main();

// import {Cli} from "./Cli";
// const rootDirPath = __dirname + '/../';
// const cli = new Cli();
// cli.cli(process.argv);

