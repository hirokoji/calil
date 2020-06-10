#!/usr/bin/env node

import {Calil} from "./Calil";
import * as config from "../config.json";

const main = async () => {

    const calil = new Calil(config.SECRET_KEY);

    const cities = await calil.getAllCities('愛知県');
    const libraries = await calil.getLibraries('愛知県', '名古屋市');

    const isbn = '4834000826';
    const systemid = libraries[4].systemid;
    const books = await calil.checkBookAvailability(isbn, systemid);
    console.log(books);
}

main();

// import {Cli} from "./Cli";
// const rootDirPath = __dirname + '/../';
// const cli = new Cli();
// cli.cli(process.argv);

