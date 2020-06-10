# calil

This script help calil api easer.

## Install

```shell script
```

## Usage

If you write code like below,

```typescript
import {Calil} from "calil";

const main = async () => {

    const calil = new Calil('YOUR_SECRET_KEY');

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

```

you could get result like below
```shell script
$ npm start                                                                              ✔  2258  08:17:24

[
  { libraryName: '鶴舞', status: '貸出可' },
  { libraryName: '熱田', status: '貸出可' },
  { libraryName: '天白', status: '貸出中' },
  { libraryName: '北', status: '貸出可' },
  { libraryName: '徳重', status: '貸出可' },
  { libraryName: '山田', status: '貸出可' },
  { libraryName: '緑', status: '貸出可' },
  { libraryName: '志段味', status: '貸出可' },
  { libraryName: '守山', status: '貸出可' },
  { libraryName: '港', status: '貸出可' },
  { libraryName: '楠', status: '貸出可' },
  { libraryName: '東', status: '貸出可' },
  { libraryName: '中村', status: '貸出中' },
  { libraryName: '南', status: '貸出中' },
  { libraryName: '中川', status: '貸出中' },
  { libraryName: '名東', status: '貸出可' },
  { libraryName: '瑞穂', status: '貸出可' },
  { libraryName: '富田', status: '貸出可' },
  { libraryName: '南陽', status: '貸出可' },
  { libraryName: '西', status: '貸出可' },
  { libraryName: '千種', status: '貸出可' }
]

```
