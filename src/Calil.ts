import axios from 'axios';

export class Calil{

    private secretKey: string;
    private format = 'json';

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    async check(isbn:string, systemid: string){
        axios.get(`http://api.calil.jp/check?appkey=${this.secretKey}&isbn=4834000826&systemid=${systemid}&format=${this.format}`)
            .then( response => console.log(response))
    }
}