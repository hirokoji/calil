import axios, { AxiosResponse } from 'axios';

export type BookStatus = {
  libraryName: string;
  status: "貸出可" |  "蔵書あり"| "館内のみ" | "貸出中" | "予約中" | "準備中"| "休館中" | "蔵書なし";
};
export class Calil {
         private secretKey: string;
         private format = "json";

         constructor(secretKey: string) {
           this.secretKey = secretKey;
         }

         async check(isbn: string, systemid: string): Promise<Error | BookStatus[]> {
           const bookStatusList: BookStatus[] = [] 
           const url = `http://api.calil.jp/check?appkey=${this.secretKey}&isbn=${isbn}&systemid=${systemid}&format=${this.format}&callback=no`;
           const response: AxiosResponse = await axios.get(url);
           if (response?.status !== 200) {
             return new Error(`response status invalid:${response?.status}`);
           }
           if (!response.data) {
             return new Error("response.data undefined");
           }

           //{"4834000826":{"Aomori_Pref":{"status":"Cache","libkey":{"青県図":"貸出可"},"reserveurl":"https://api.calil.jp/reserve?id=ae595257bb5e59c66f0ef813a2f6a381"}}}
           const bookList = response.data.books;
           const libkey = bookList[isbn][systemid]?.libkey
           if (!libkey){
             return new Error("libkey undefined");
           }
           Object.keys(libkey).forEach((libraryName: string) => {
             bookStatusList.push({ libraryName, status: libkey[libraryName] });
           });
           return bookStatusList
         }
       }

       