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

           const url = `http://api.calil.jp/check?appkey=${this.secretKey}&isbn=${isbn}&systemid=${systemid}&format=${this.format}&callback=no`;
           const response: AxiosResponse = await axios.get(url);

           if (response?.status !== 200) {
             return new Error(`[Error] response status invalid. status code: ${response?.status}`);
           }
           if (!response?.data?.books[isbn][systemid]['libkey']){
             return new Error(`[Error] libkey undefined.  Recived data from web api: ${JSON.stringify(response.data)}`);
           }

           const libkey = response.data.books[isbn][systemid]['libkey'];
           const bookStatusList: BookStatus[] = Object.keys(libkey).map((libraryName: string) => {
                 return { libraryName, status: libkey[libraryName] };
           });

           return bookStatusList
         }

}

       