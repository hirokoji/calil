import axios, { AxiosResponse } from 'axios';


export type Prefecture =  '北海道'| '青森県'| '岩手県'| '宮城県'| '秋田県'| '山形県'| '福島県'| '茨城県'| '栃木県'| '群馬県'| '埼玉県'| '千葉県' | '東京都' | '神奈川県'| '新潟県'| '富山県'| '石川県'| '福井県'| '山梨県'| '長野県'| '岐阜県'| '静岡県'| '愛知県'| '三重県'|
    '滋賀県'| '京都府'| '大阪府'| '兵庫県'| '奈良県'| '和歌山県'| '鳥取県'| '島根県'| '岡山県'| '広島県'| '山口県'| '徳島県'| '香川県'| '愛媛県'| '高知県'| '福岡県'| '佐賀県'| '長崎県'| '熊本県'| '大分県'| '宮崎県'| '鹿児島県'| '沖縄県';

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

    async checkBookAvailability(isbn: string, systemid: string): Promise<Error | BookStatus[]> {

        const url = `http://api.calil.jp/check?appkey=${this.secretKey}&isbn=${isbn}&systemid=${systemid}&format=${this.format}&callback=no`;
        const response: AxiosResponse = await axios.get(url);

        if (response?.status !== 200) {
            return new Error(`[Error] response status invalid. status code: ${response?.status}`);
        }
        if (!response?.data?.books[isbn][systemid]['libkey']) {
            return new Error(`[Error] libkey undefined.  Recived data from web api: ${JSON.stringify(response.data)}`);
        }

        const libkey = response.data.books[isbn][systemid]['libkey'];
        const bookStatusList: BookStatus[] = Object.keys(libkey).map((libraryName: string) => {
            return {libraryName, status: libkey[libraryName]};
        });

        return bookStatusList
    }

    async getAllCities(pref: Prefecture){
        const url = encodeURI(`http://api.calil.jp/citylist?pref=${pref}&format=json&callback=no`);
        const response: AxiosResponse = await axios.get(url);
        return response.data;
    }

    async getLibraries(pref: Prefecture, city: string) {

        const url = encodeURI(`http://api.calil.jp/library?appkey=${this.secretKey}&format=json&callback=no&pref=${pref}&city=${city}`);

        const response: AxiosResponse = await axios.get(url);
        const fixBrokenJson = () => response.data.replace(');', '');
        return JSON.parse(fixBrokenJson());
    }
}
