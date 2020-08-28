import XLSX from 'xlsx';

function downExcelTemplate ({SheetNames, SheetDatas, title}) {
    let titleNo = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ];
    let Sheets = {};

    SheetNames.map(item => {
        Sheets = Object.assign(Sheets, {
            [item]: {}
        });
    });
    SheetDatas.map((item, i) => {
        let num = 0;
        let cols = [];

        item.data.map(({name, value, widthArr}, index) => {
            num++;
            if (item.type === 'level') {
                cols.push({wpx: widthArr[0] || (index + '').length * 16});
                Sheets[SheetNames[i]] = Object.assign(Sheets[SheetNames[i]], {
                    '!ref': `A1:${titleNo[num - 1]}2`,
                    '!cols': cols,
                    [`${titleNo[num - 1]}1`]: {
                        v: name
                    },
                    [`${titleNo[num - 1]}2`]: {
                        v: value
                    }
                });
            } else {
                Sheets[SheetNames[i]] = Object.assign(Sheets[SheetNames[i]], {
                    '!ref': `A1:B${num}`,
                    '!cols': [{wpx: widthArr[0] || (index + '').length * 16}, {wpx: widthArr[1] || (index + '').length * 16}],
                    [`A${num}`]: {
                        v: name
                    },
                    [`B${num}`]: {
                        v: value
                    }
                });
            }
        });
    });
    const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};

    XLSX.writeFile({SheetNames, Sheets, Props: {}}, `${title}.xlsx`, wopts);
}

function getExcelData (f) {
    return new Promise(function (resolve, reject) {
        const fileReader = new FileReader();

        fileReader.onload = ev => {
            try {
                const data = ev.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                const sheets = workbook.SheetNames[0];
                const sheetArray = XLSX.utils.sheet_to_json(
                    workbook.Sheets[sheets]
                );

                resolve(sheetArray);
            } catch (err) {
                reject(err);
            }
        };
        fileReader.readAsBinaryString(f);
    });
}

function simpleDownExcelTemplate ({data, title = '数据', SheetNames = ['Sheet1']}) {
    const wb = {
        SheetNames,
        Sheets: {},
        Props: {}
    };
    const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary', cellStyles: true}; // 这里的数据是用来定义导出的格式类型

    SheetNames.map(item => {
        wb.Sheets[item] = XLSX.utils.json_to_sheet(data); // 通过json_to_sheet转成单页(Sheet)数据
    });
    XLSX.writeFile(wb, `${title}.xlsx`, wopts);
}

export {
    downExcelTemplate,
    getExcelData,
    simpleDownExcelTemplate
};