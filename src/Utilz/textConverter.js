import React from 'react';
import axios from 'axios';

export default async function textConverter(p_name = null){

    const targetLanguage = 'en';
    const sourceLanguage = 'ta'; // 'ta' is the ISO 639-1 code for Tamil
    const format = 'text'; // Ensure the response is in plain text

    const response = await axios
                .post(
                    'https://translation.googleapis.com/language/translate/v2',
                    {},
                    {
                    params: {
                        q: p_name,
                        target: targetLanguage,
                        source: sourceLanguage,
                        format: format,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                    }
                    }
                )
                .then((response) => {
                    console.log(response);
                    return response;
               
                })
                .catch((err) => {
                    console.log('rest api error', err);
                });
            return response;
            
}
