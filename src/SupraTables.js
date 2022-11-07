/**
 * @Description This library allows to generate a dynamic table with few lines being compatible with applications developed in Google AppScript.
 * @author: Arturo G - zesertebe@gmail.com
 * 
 * @tutorial https://ocancelada.dev/proyectos/supraTables.html
 *
 * @license Copyright (c) 2022 https://ocancelada.dev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish and/or distribute
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const SUPRA_TABLES = ({ _mainContainer, _namedFunction, exportData = true, checkElements = true, setNumShowResult = false, maxSpan = 5, filterShowColumns = true, numShowResult = 50, styles = {
    primaryColor: null,
    secondaryColor: null,
    primaryTextColor: null,
    secondaryTextColor: null,
    successColor: null,
    dangerColor: null,
    warningColor: null,
    neutralTextColor: null,
    neutralColor: null,
    primaryBgColor: null,
    secondaryBgColor: null,
}, classes = {
    tdStyle: null,
    checkInputStyle: null,
    spanPaginateStyle: null,
    spanPaginateSelectedStyle: null,
    spanPaginateContainerStyle: null,
    inputSearchStyle: null,
    inputFloatLabel: null,
    containerToolsTable: null,
    modal: null,
}, locale = 'ES' }) => {

    // data
    
    const INIT_DATA = {
        _I18N: {
            'ES': {
                nullContainer: 'No se encuentra el contenedor principal',
                indexRequired: 'El argumento "index" debe ser un cadena de texto',
                noCheckSearch: 'Ningún registro coincide con el criterio de búsqueda',
                noDataMultiArray: 'El dato esperado es un arreglo de dos dimensiones',
                tableAlreadyExists: 'La tabla ya existe. Utilice el metodo "updateData" si desea actualizar la información de su tabla.',
                functionOrArrIsRequired: 'Debe proveer un método para obtener datos o un arreglo que contenga datos.',
                search: 'Buscar',
                next: 'Siguiente',
                prev: 'Anterior',
                go: 'Ir',
                close: 'Cerrar',
                open: 'abrir',
                filter: 'filtrar',
                export: 'exportar',
                reportCSV: 'Reporte CSV',
                reportSheet: 'Reporte EXCEL',
                selectAll: 'Seleccionar Todo',
                resumeTable: (start, end, total) => `Mostrando ${start} a ${end} de ${total} resultados`,

            },
            'EN': {
                nullContainer: 'Main container not found',
                indexRequired: 'Argument "index" must be a string',
                noCheckSearch: 'No record matches the search criteria',
                noDataMultiArray: 'The expected data is a two-dimensional array',
                tableAlreadyExists: 'The table already exists. Use the "updateData" method if you want to update the information in your table.',
                functionOrArrIsRequired: 'You must provide a method to get data or an array containing data.',
                search: 'Search',
                next: 'Next',
                prev: 'Previous',
                go: 'Go',
                close: 'Close',
                open: 'open',
                filter: 'filter',
                export: 'export',
                reportCSV: 'CSV report',
                reportSheet: 'EXCEL report',
                selectAll: 'Select All',
                resumeTable: (start, end, total) => `Show ${start} to ${end} of ${total} results`,
            },
            'RU': {
                nullContainer: 'Главный контейнер не найден',
                indexRequired: 'Аргумент "индекс" должен быть строкой',
                noCheckSearch: 'Ни одна запись не соответствует критериям поиска',
                noDataMultiArray: 'Ожидаемые данные представляют собой двумерный массив',
                tableAlreadyExists: 'Таблица уже существует. Используйте метод "updateData", если вы хотите обновить информацию в вашей таблице',
                functionOrArrIsRequired: 'Вы должны предоставить метод для получения данных или массив, содержащий данные.',
                search: 'Поиск',
                next: 'Следующий',
                prev: 'Предыдущий',
                go: 'Перейти',
                close: 'Закрыть',
                open: 'открыть',
                filter: 'фильтр',
                export: 'экспорт',
                reportCSV: 'CSV-отчет',
                reportSheet: 'Отчет EXCEL',
                selectAll: 'Выбрать все',
                resumeTable: (start, end, total) => `Показать ${start} - ${end} из ${total} результатов`,
            },
            'FR': {
                nullContainer: 'Conteneur principal non trouvé',
                indexRequired: 'L\'argument "index" doit être une chaîne de caractères.',
                noCheckSearch: 'Aucun enregistrement ne correspond aux critères de recherche',
                noDataMultiArray: 'Les données attendues sont un tableau bidimensionnel',
                tableAlreadyExists: 'La table existe déjà. Utilisez la méthode "updateData" si vous souhaitez mettre à jour les informations de votre tableau.',
                functionOrArrIsRequired: 'Vous devez fournir une méthode pour obtenir des données ou un tableau contenant des données.',
                search: 'Recherche',
                next: 'Suivant',
                prev: 'Précédent',
                go: 'Aller',
                close: 'Fermer',
                open: 'Ouvrir',
                filter: 'Filtre',
                export: 'Exportation',
                reportCSV: 'Rapport CSV',
                reportSheet: 'Rapport EXCEL',
                selectAll: 'Sélectionner tout',
                resumeTable: (start, end, total) => `Montrant ${start} à ${end} de ${total} résultats`,
            },
        },
        _characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        _charactersLength: 62,
        _nulls: [null, undefined, '', 'undefined'],
        _styles: {
            'primaryColor': '#8570EA',
            'secondaryColor': '#F0CE97',
            'primaryTextColor': '#9BFFD5;',
            'secondaryTextColor': '#240046',
            'successColor': '#45C30E',
            'dangerColor': '#FB6A6A',
            'warningColor': '#FBE52C',
            'neutralTextColor': '#333',
            'neutralColor': '#eee',
            'primaryBgColor': '#111',
            'secondaryBgColor': '#fff',
        },
        _classes: {},

    };
    
    const STYLE_LOCALE = INIT_DATA._I18N[locale] != undefined ? locale : 'EN';
    //checks:
    if (!_mainContainer instanceof HTMLElement || typeof _mainContainer !== 'string') { return null };
    _mainContainer = typeof _mainContainer === 'string' ? document.getElementById(_mainContainer) : _mainContainer;
    if (INIT_DATA._nulls.includes(_mainContainer)) { console.error(INIT_DATA._I18N[STYLE_LOCALE].nullContainer); return INIT_DATA._nulls[0] }

    const STYLE_INDICATOR = `--${make_id()}_`;
    const ID_INDICATOR = `z${make_id()}z`;
    
    //styles
    var MD = {
        _gE: (id) => document.getElementById(id),
        _isCreatedTable: false,
        _totalSelectedItems: {},
        _script: null,
        _scriptText: '',
        _scriptFunction: null,
        _mainContainer,
        _globalData: [],
        _pages: [],
        _filterShowColumns: filterShowColumns ? true : false,
        _orderColumns: false,
        _ordercolumnsData: {},
        _arrColumnsChecked: [],
        _aditionalColumns: [],
        _columnsName: [],
        _columnsToShow: [],
        _paginate: 0,
        _maxSpan: parseInt(maxSpan) > 1 ? parseInt(maxSpan) : 5,
        _numShowResult: parseInt(numShowResult) > 1 ? parseInt(numShowResult) : 50,
        _export_data: exportData && checkElements ? true : false,
        _checkElements: checkElements ? true : false,
        _setNumShowResult: setNumShowResult ? true: false,

        _elements: {
            _modal: getElementStructure('_modal'),
            _modalClose: getElementStructure('_modalClose'),
            _modalButtonClose: getElementStructure('_modalButtonClose'),
            _buttonReportCSV: getElementStructure('_buttonReportCSV'),
            _buttonReportSheet: getElementStructure('_buttonReportSheet'),
            _mainTable: getElementStructure('_mainTable'),
            _mainThead: getElementStructure('_mainThead'),
            _checkColumn: getElementStructure('_checkColumn'),
            _downloadBadge: getElementStructure('_downloadBadge'),
            _filterTableInput: getElementStructure('_filterTableInput'),
            _buttonExport: getElementStructure('_buttonExport'),
            _inputStepper: getElementStructure('_inputStepper'),
            _tablePaginateStepper: getElementStructure('_tablePaginateStepper'),
            _inputStepper_addon2: getElementStructure('_inputStepper_addon2'),
            _tablePaginate: getElementStructure('_tablePaginate'),
            _tablePaginatePrev: getElementStructure('_tablePaginatePrev'),
            _tablePaginatePrevButton: getElementStructure('_tablePaginatePrevButton'),
            _tablePaginateNext: getElementStructure('_tablePaginateNext'),
            _tablePaginateNextButton: getElementStructure('_tablePaginateNextButton'),
            _tableTBody: getElementStructure('_tableTBody'),
            _tableTheadTr: getElementStructure('_tableTheadTr'),
            _ulFilter: getElementStructure('ulFilter'),
            _reportTbodyCheckAll: getElementStructure('_reportTbodyCheckAll'),
            _containerToolsTable: getElementStructure('_containerToolsTable'),
            _filterTableFind: getElementStructure('_filterTableFind'),
            _containerCheckColumns: getElementStructure('_containerCheckColumns'),
            _buttonArrowShowColumns: getElementStructure('_buttonArrowShowColumns'),
            _resumeTable: getElementStructure('_resumeTable'),
            _tdThead: getElementStructure('_tdThead'),
            _setNumShowResult: getElementStructure('__setNumShowResult'),
        },
        _styles: {
            'pc': `var(${STYLE_INDICATOR}primaryColor)`,
            'sc': `var(${STYLE_INDICATOR}secondaryColor)`,
            'ptc': `var(${STYLE_INDICATOR}primaryTextColor)`,
            'stc': `var(${STYLE_INDICATOR}secondaryTextColor)`,
            'ssc': `var(${STYLE_INDICATOR}successColor)`,
            'dc': `var(${STYLE_INDICATOR}dangerColor)`,
            'wc': `var(${STYLE_INDICATOR}warningColor)`,
            'ntc': `var(${STYLE_INDICATOR}neutralTextColor)`,
            'nc': `var(${STYLE_INDICATOR}neutralColor)`,
            'pbc': `var(${STYLE_INDICATOR}primaryBgColor)`,
            'sbc': `var(${STYLE_INDICATOR}secondaryBgColor)`,
            'isDisabled': STYLE_INDICATOR + 'isDisabled',
            'isHidden': STYLE_INDICATOR + 'isHidden',
            'showModal': STYLE_INDICATOR + 'showModal',
        },
        _icons: (type, color, width, height) => {
            let icon = '';
            switch (type) {
                case 'ARROW_UP':
                    icon = `<path d="M18 15a1 1 0 0 1-.64-.23L12 10.29l-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.41l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .13 1.41A1 1 0 0 1 18 15z" data-name="arrow-ios-upward"></path>`;
                    break;
                case 'ARROW_DOWN':
                    icon = `<path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z" data-name="arrow-ios-downward"></path>`;
                    break;
                case 'CSV':
                    icon = `<path fill="none" stroke="#000" stroke-width="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M7,13 C7,13 6.00000004,13 5,13 C3.99999996,13 3,13.5 3,14.5 L3,16 C3,16 3.00000001,16.5 3,17.5 C2.99999999,18.5 4,19 5,19 L7,19 M13.25,13 C13.25,13 12.25,13 10.75,13 C9.25,13 8.75,13.5 8.75,14.5 C8.75,15.5 9.25,16 10.75,16 C12.25,16 12.75,16.5 12.75,17.5 C12.75,18.5 12.25,19 10.75,19 C9.25,19 8.25,19 8.25,19 M20.5,12 C20.5,12 20.5,12 20.5,12.5 C20.5,13 18,19 18,19 L17.5,19 C17.5,19 15,13 15,12.5 L15,12"></path>`;
                    break;
                case 'PDF':
                    icon = `<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"></path>`;
                    break;
                case 'EXCEL':
                    icon = `<path xmlns="http://www.w3.org/2000/svg" d="M854.6 288.6 639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4-83.4 132.8a12.04 12.04 0 0 0 10.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9 5.6-3.6 7.2-11 3.6-16.6l-84-130.4 85.3-132.5a12.04 12.04 0 0 0-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z"></path>`;
                    break;
                case 'FILTER':
                    icon = `<path d="M14.037,20.937a1.015,1.015,0,0,1-.518-.145l-3.334-2a2.551,2.551,0,0,1-1.233-2.176V12.091a1.526,1.526,0,0,0-.284-.891L4.013,4.658a1.01,1.01,0,0,1,.822-1.6h14.33a1.009,1.009,0,0,1,.822,1.6h0L15.332,11.2a1.527,1.527,0,0,0-.285.891v7.834a1.013,1.013,0,0,1-1.01,1.012ZM4.835,4.063,9.482,10.62a2.515,2.515,0,0,1,.47,1.471v4.524a1.543,1.543,0,0,0,.747,1.318l3.334,2,.014-7.843a2.516,2.516,0,0,1,.471-1.471l4.654-6.542,0,0Z"></path>`;
                    break;
                case 'EXPORT':
                    icon = `<path xmlns="http://www.w3.org/2000/svg" d="M8.71 7.71 11 5.41V15a1 1 0 0 0 2 0V5.41l2.29 2.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-.33-.21 1 1 0 0 0-.76 0 1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42zM21 14a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1z"></path>`;
                    break;
                default:
                    icon = `<path d="M11 16h2V7h3l-4-5-4 5h3z"></path><path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></path>`;
                    break;
            }
            return `<svg viewBox="0 0 25 25" height="${height}" width="${width}" fill="${color}">${icon}</svg>`
        },
    }
    INIT_DATA._classes[STYLE_INDICATOR + 'tdStyle'] = `.${STYLE_INDICATOR}tdStyle{padding: 5px 0; transition: .5s; border-right: none; font-size: 14px; color: ${MD._styles.stc};}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'trStyle'] = `.${STYLE_INDICATOR}trStyle{transition: .5s; border-bottom: .1rem solid ${MD._styles.stc}; color: ${MD._styles.stc};} .${STYLE_INDICATOR}trStyle:hover{border-bottom-width: 3px;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'checkInputStyle'] = `.${STYLE_INDICATOR}checkInputStyle{color: ${MD._styles.ptc}; display: flex; justify-content: center;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'spanPaginateStyle'] = `.${STYLE_INDICATOR}spanPaginateStyle{    position: relative;cursor: pointer;border: none;color: ${MD._styles.pc};background-color: ${MD._styles.sc};border-radius: 50%;width: 20px;margin: 0 4px;height: 20px;outline: none;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'spanPaginateSelectedStyle'] = `.${STYLE_INDICATOR}spanPaginateSelectedStyle{font-weight: bold; border: 2px solid ${MD._styles.pc};} `;
    INIT_DATA._classes[STYLE_INDICATOR + 'spanPaginateContainerStyle'] = `.${STYLE_INDICATOR}spanPaginateContainerStyle{} .${STYLE_INDICATOR}spanPaginateContainerStyle:after{content: '';position: absolute;border: 1px solid ${MD._styles.sc};width: inherit;height: inherit;padding: 65%;top: calc(calc(-100% / 7) - 5%);left: calc(calc(-100% / 6.4705) - 4%);border-radius: 50%;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'tablePaginate'] = `.${STYLE_INDICATOR}tablePaginate{width: 100%;display: flex;justify-content: space-evenly;flex-direction: row;align-items: center;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'showModal'] = `.${STYLE_INDICATOR}showModal {visibility: visible !important;opacity: 1 !important;}`
    INIT_DATA._classes[STYLE_INDICATOR + 'isHidden'] = `.${STYLE_INDICATOR}isHidden {pointer-events: none !important; display:none !important;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'isDisabled'] = `.${STYLE_INDICATOR}isDisabled {pointer-events: none !important;filter: blur(1.5rem);}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'inputSearchStyle'] = `.${STYLE_INDICATOR}inputSearchStyle {height: 100%; margin-right: 2rem; padding: 10px; border-radius: 50px; border: 1px solid #707070;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'containerToolsTable'] = `.${STYLE_INDICATOR}containerToolsTable {text-align: center;display: flex;flex-direction: row;align-items: center; position: sticky;top: 0;height: auto; width: auto;background: transparent;backdrop-filter: blur(3px);}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'inputFloatLabel'] = `.${STYLE_INDICATOR}inputFloatLabel {left: 8px;position: absolute;top: 0;opacity: 0;transition: all 200ms;} .input_float:not(:placeholder-shown)+.input_float__label {background: none;transform: translate(0, -70%);opacity: 1;color: #111;font-weight: 800;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'table'] = `.${STYLE_INDICATOR}table{width: 100%;border-collapse: collapse;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'selectNumShowResult'] = `.${STYLE_INDICATOR}selectNumShowResult {border-radius: 50px; padding: 3px; margin-right: 1rem; color: ${MD._styles.ptc}; background: ${MD._styles.pc};}`
    INIT_DATA._classes[STYLE_INDICATOR + 'formCheck'] = `.${STYLE_INDICATOR}formCheck{display: grid;grid-template-columns: 1fr 2fr;grid-gap: 10px;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'buttonDanger'] = `.${STYLE_INDICATOR}buttonDanger{background: ${MD._styles.dc}; color: ${MD._styles.ntc}; }`;
    INIT_DATA._classes[STYLE_INDICATOR + 'buttonSecondary'] = `.${STYLE_INDICATOR}buttonSecondary{background: ${MD._styles.sc}; color: ${MD._styles.pc}; }`;
    INIT_DATA._classes[STYLE_INDICATOR + 'buttonPrimary'] = `.${STYLE_INDICATOR}buttonPrimary{background: ${MD._styles.pc}; color: ${MD._styles.ptc}; }`;
    INIT_DATA._classes[STYLE_INDICATOR + 'resumeTable'] = `.${STYLE_INDICATOR}resumeTable{color: ${MD._styles.stc}}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'floatChildRight'] = `.${STYLE_INDICATOR}floatChildRight {position: absolute;top: 0%;right: 100%;width: fit-content;padding: 0;height: auto;max-height: 50vh;overflow-y: auto;background: ${MD._styles.ntc};color: ${MD._styles.nc};border: 1px solid;z-index: 100000;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'stepper'] = `.${STYLE_INDICATOR}stepper{    display: grid;grid-template-rows: 1fr;grid-template-columns: 1fr 1fr;grid-gap: 0;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'button'] = `.${STYLE_INDICATOR}button{font-size: 14px;font-family: Roboto Condensed;font-style: Bold;line-height: 20px;border-radius: 50px;word-spacing: 10px;display: flex;column-gap: 8px;justify-content: space-around;align-items: center;border: none;padding: 8px 16px;cursor: pointer;transition: .5s;font-weight: 700; }.${STYLE_INDICATOR}button:hover{transform: scale(1.06);}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'thead'] = `.${STYLE_INDICATOR}thead{background: ${MD._styles.pc}; color: ${MD._styles.ptc};} .${STYLE_INDICATOR}thead tr td{padding: 10px;}`;
    INIT_DATA._classes[STYLE_INDICATOR + 'modal'] = `.${STYLE_INDICATOR}modal {position: relative;  visibility: hidden;opacity: 0;transition: visibility .4s, opacity 0.4s linear; display: block;position: fixed;z-index: 100;padding-top: 100px;left:0;top: 0;width:100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);}.${STYLE_INDICATOR}modal-content {background: ${MD._styles.nc}; color: ${MD._styles.ntc};border-radius:0.3rem; margin: auto;padding: 5px;border: 1px solid #888;width: 50%; position: relative;}.${STYLE_INDICATOR}modalClose{color: #aaaaaa;float: right;font-size: 28px;font-weight: bold;position: absolute;top: 8px;right: 8px;}.${STYLE_INDICATOR}modalClose:hover, .${STYLE_INDICATOR}modalClose:focus {color: #000;text-decoration: none;cursor: pointer;}`;
    MD._classes = Object.keys(INIT_DATA._classes).map(el => INIT_DATA._nulls.includes(classes[el]) ? `${INIT_DATA._classes[el]}` : '').join(' ');
    MD._root = `*{letter-spacing: 1px;} :root{ ${Object.keys(INIT_DATA._styles).map(_style => `${STYLE_INDICATOR + _style}: ${INIT_DATA._nulls.includes(styles[_style]) ? INIT_DATA._styles[_style][0] == '#' ? INIT_DATA._styles[_style] : '' : styles[_style].search('--') != -1 ? `var(${styles[_style]})` : styles[_style]};`).join('')} }`;
    MD._styles['tds'] = classes.tdStyle ?? STYLE_INDICATOR + 'tdStyle';
    MD._styles['trs'] = classes.tdStyle ?? STYLE_INDICATOR + 'trStyle';
    MD._styles['rt'] = classes.tdStyle ?? STYLE_INDICATOR + 'resumeTable';
    MD._styles['ci'] = classes.checkInputStyle ?? STYLE_INDICATOR + 'checkInputStyle';
    MD._styles['sps'] = classes.spanPaginateStyle ?? STYLE_INDICATOR + 'spanPaginateStyle';
    MD._styles['spss'] = classes.spanPaginateSelectedStyle ?? STYLE_INDICATOR + 'spanPaginateSelectedStyle';
    MD._styles['spcs'] = classes.spanPaginateContainerStyle ?? STYLE_INDICATOR + 'spanPaginateContainerStyle';
    MD._styles['ctt'] = classes.containerToolsTable ?? STYLE_INDICATOR + 'containerToolsTable';
    MD._styles['iss'] = classes.inputSearchStyle ?? STYLE_INDICATOR + 'inputSearchStyle';
    MD._styles['ifl'] = classes.inputFloatLabel ?? STYLE_INDICATOR + 'inputFloatLabel';
    MD._styles['m'] = classes.modal ?? STYLE_INDICATOR + 'modal';
    MD._styles['ta'] = classes.table ?? STYLE_INDICATOR + 'table';
    MD._styles['tb'] = classes.thead ?? STYLE_INDICATOR + 'thead';
    MD._styles['tp'] = classes.tablePaginate ?? STYLE_INDICATOR + 'tablePaginate';
    MD._styles['bt'] = classes.button ?? STYLE_INDICATOR + 'button';
    MD._styles['bts'] = classes.thebuttonSecondaryad ?? STYLE_INDICATOR + 'buttonSecondary';
    MD._styles['btp'] = classes.thebuttonSecondaryad ?? STYLE_INDICATOR + 'buttonPrimary';
    MD._styles['btd'] = classes.thebuttonSecondaryad ?? STYLE_INDICATOR + 'buttonDanger';
    MD._styles['stepper'] = classes.thebuttonSecondaryad ?? STYLE_INDICATOR + 'stepper';
    MD._styles['formCheck'] = classes.thebuttonSecondaryad ?? STYLE_INDICATOR + 'formCheck';
    MD._styles['snsr'] = classes.selectNumShowResult ?? STYLE_INDICATOR + 'selectNumShowResult';
    MD._styles['floatChildRight'] = classes.thebuttonSecondaryad ?? STYLE_INDICATOR + 'floatChildRight';
    MD._resumeTable = (id) => `<p><strong id="${id}" class="${MD._styles.rt}">...</strong></p>`;
    MD._tr = (index, data) => { return `<tr class="${MD._styles['trs']}" data-pos="${index}">${data}</tr>` };
    MD._td = (data) => `<td class="${MD._styles['tds']}">${data}</td>`;
    MD._tdAditionalColumn = (data) => `<td class="${MD._styles['tds']}" style="color: ${MD._styles.ptc}">${data}</td>`;
    MD._tdThead = (data, index, indexFilter) => `<td data-filter="${indexFilter}" data-pos="${index}" id="${ID_INDICATOR}_${MD._elements._tdThead._id}_${index}" ${MD._orderColumns ? `onclick="${_namedFunction}.setOrderTable(this)"` : ''} class="${MD._styles['tds']}" style="cursor: pointer; color: ${MD._styles.ptc}"> <div style="display: flex; justify-content: center; align-items: center;"> ${data} <div id="${ID_INDICATOR}_${MD._elements._tdThead._id}_${index}_icon" style="width: fit-content; margin-left: 4px;"> ${MD._orderColumns ? MD._icons('ARROW_UP', MD._styles.ptc, 16, 16) : ''} </div></div> </td>`;
    MD._spanPaginate = (index) => `<span class="${MD._styles['sps']}" id="${ID_INDICATOR}spanPaginate_${index}" onclick="${_namedFunction}.createTableFiles(${index}, this)"><div class="${MD._styles['spcs']}">${index + 1}</div></span>`;
    MD._spanPaginateSelected = (index) => `<span class="${MD._styles['sps']} ${MD._styles['spss']}" id="${ID_INDICATOR}spanPaginate_${index}" onclick="${_namedFunction}.createTableFiles(${index}, this)"><div class="${MD._styles['spcs']}">${index + 1}</div></span>`;
    MD._checkItems = (_id, _text = '') => `<div class="${MD._styles['ci']}">${_text}<input type="checkbox" value=""  id="${_id}" onchange="${_namedFunction}.updateSelectedItems(this)"></div>`;
    MD._table = (_tempTd) => `<table class="${MD._styles['ta']}" id="${MD._elements._mainTable._id}"><thead class="${MD._styles.tb}" style="text-align: center;top: 0;position: sticky; font-weight: 700;" id="${MD._elements._mainThead._id}"><tr id="${MD._elements._tableTheadTr._id}">` + _tempTd + `</tr></thead><tbody id="${MD._elements._tableTBody._id}" style="text-align: center;"></tbody></table>`;
    MD._containerToolsTable = (_prevButton, _nextButton) => `<div class="${MD._styles.ctt}" id="${MD._elements._containerToolsTable._id}">  <input type="text" id="${MD._elements._filterTableFind._id}" class="${MD._styles['iss']}" placeholder=" ${INIT_DATA._I18N[STYLE_LOCALE].search}" onkeyup="${_namedFunction}.filterTable(this)"><label class="${MD._styles['ifl']}">${INIT_DATA._I18N[STYLE_LOCALE].search} </label> ${MD._setNumShowResult ? `<select class="${MD._styles.snsr}" id="${MD._elements._setNumShowResult._id}"> ${MD._globalData.length > 5 && MD._numShowResult > 5 ? `<option value="5">5</option>` : ''}${MD._globalData.length > 10 && MD._numShowResult > 10 ? `<option value="10">10</option>` : ''}${MD._globalData.length > 20 && MD._numShowResult > 20 ? `<option value="20">20</option>` : ''}${MD._globalData.length > 50 && MD._numShowResult > 50 ? `<option value="50">50</option>` : ''}${MD._globalData.length > 100 && MD._numShowResult > 100 ? `<option value="100">100</option>` : ''}${`<option selected value="${MD._numShowResult}">${MD._numShowResult}</option>`}${MD._globalData.length - 1 > MD._numShowResult? `<option value="${MD._globalData.length - 1}">${MD._globalData.length}</option>` : ''}</select>` : ''} <div class="" style="grid-gap: 10px;display: grid;grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr;grid-template-rows: 1fr;width: 100%;height: 100%;align-items: center;"><section id="${MD._elements._tablePaginatePrev._id}"><button id="${MD._elements._tablePaginatePrevButton._id}" class="${MD._styles.bt} ${MD._styles.bts}">${_prevButton}${INIT_DATA._I18N[STYLE_LOCALE].prev}</button></section><section id="${MD._elements._tablePaginate._id}" class="${MD._styles.tp}"></section><section id="${MD._elements._tablePaginateNext._id}"><button id="${MD._elements._tablePaginateNextButton._id}" class="${MD._styles.bt} ${MD._styles.bts}">${INIT_DATA._I18N[STYLE_LOCALE].next} ${_nextButton}</button></section><section id="${MD._elements._tablePaginateStepper._id}"><div class="${MD._styles['stepper']}"><input type="number" id="${MD._elements._inputStepper._id}" class="form-control" min="1" value="1" aria-label="Recipient's username" aria-describedby="basic-addon2"><span class="" id="${MD._elements._inputStepper_addon2._id}"> <button class="${MD._styles.bt} ${MD._styles.btp}" style="border-radius:0;">${INIT_DATA._I18N[STYLE_LOCALE].go}</button></span></div></section> ${MD._filterShowColumns ? `<div style="position: relative; margin: .7rem;"><button class="${MD._styles.bt} ${MD._styles.btp}" id="${MD._elements._buttonArrowShowColumns._id}" >${MD._icons('FILTER', MD._styles.ptc, '16', '16')}</button><div class="${MD._styles["floatChildRight"]} ${MD._styles['isHidden']}" id="${MD._elements._containerCheckColumns._id}"></div></div>` : ''} ${MD._export_data ? `<section><button class="${MD._styles.bt} ${MD._styles.btp}" id="${MD._elements._buttonExport._id}"> ${MD._icons('EXPORT', MD._styles.ptc, '16', '16')} ${INIT_DATA._I18N[STYLE_LOCALE].export}<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="${MD._elements._downloadBadge._id}"></span></button></section>` : ''}</div></div>`;
    MD._liFilter = (index, element) => `<li style="list-style: none; border-bottom: 1px solid; margin: .5rem 0;"><div class="${MD._styles["formCheck"]}"><input class="form-check-input" onchange="${_namedFunction}.setTheadColumns()" type="checkbox" value="" id="${MD._elements._checkColumn._id}_${index}" ${MD._columnsToShow.includes(index) ? 'checked' : ''}><label class="form-check-label" for="${MD._elements._checkColumn._id}_${index}">${MD._columnsName[MD._columnsToShow.indexOf(index)] != undefined ? MD._columnsName[MD._columnsToShow.indexOf(index)] : element}</label></div></li>`;
    MD._modal = (modalId, modalCloseId, modalExportCsvId, modalExportSheetId, modalButtonCloseId) => `<div id="${modalId}" class="${MD._styles['m']}"><div class="${MD._styles['m']}-content"><h3 style="text-align: center; ">${(INIT_DATA._I18N[STYLE_LOCALE].export).toUpperCase()}</h3><hr> <span class="${MD._styles['m']}Close" id="${modalCloseId}">&times;</span><p style="display: flex;flex-direction:row;justify-content: space-around; align-items: center;"><button id="${modalExportCsvId}" class="${MD._styles.bt} ${MD._styles.bts}"> ${INIT_DATA._I18N[STYLE_LOCALE].reportCSV}</button><button id="${modalExportSheetId}" class="${MD._styles.bt} ${MD._styles.bts}"> ${INIT_DATA._I18N[STYLE_LOCALE].reportSheet}</button></p><p style="display: flex;justify-content: end;padding: 0 20px;"><button id="${modalButtonCloseId}" class="${MD._styles.bt} ${MD._styles.btd}">${INIT_DATA._I18N[STYLE_LOCALE].close}</button></p></div></div>`,
        (() => {
            MD._mainContainer.insertAdjacentHTML('beforebegin', `<style>${MD._root} ${MD._classes}</style>`);
        })();

    const setReportFunc = (type, id) => {
        let func;
        let _data = [];
        switch (type) {
            case 'CSV':
                func = (e) => {
                    _data = []
                    _data.push(MD._globalData[0].filter((el, eli) => MD._arrColumnsChecked.includes(eli)));
                    Object.keys(MD._totalSelectedItems).forEach(el => _data.push(MD._totalSelectedItems[el]))
                    let lineArray = [];
                    _data.forEach(function (infoArray, index) {
                        let line = infoArray.join(";");
                        lineArray.push(line);
                    });
                    let csvContent = lineArray.join("\n");
                    let element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvContent));
                    element.setAttribute('download', INIT_DATA._I18N[STYLE_LOCALE].reportCSV + '.csv');
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);                  
                };
                break;
            case 'SHEET':
                func = (e) => {
                    _data = []
                    _data.push(MD._globalData[0].filter((el, eli) => MD._arrColumnsChecked.includes(eli)));
                    Object.keys(MD._totalSelectedItems).forEach(el => _data.push(MD._totalSelectedItems[el]))
                    let lineText = '';
                    _data.forEach(function (infoArray, index) {
                        infoArray.forEach(function (ColItem, ColIndex) {
                            lineText += ColItem + ',';
                        })
                        lineText += "\r\n";
                    });
                    
                    
                    let element = document.createElement('a');
                    element.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(lineText));
                    element.setAttribute('download', INIT_DATA._I18N[STYLE_LOCALE].reportSheet);
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);          
                };
                break;
        }
        return MD._gE(id).addEventListener('click', e => { func(e) })
    }
       
    // methods
    const filterTable = (e) => {
        if (e === '') { return null };
        let searchWord = new RegExp(e.value.toLowerCase());
        let checkValues = false;
        let tempHtml = '';
        let tempHtml2 = '';
        let tempPages = [];
        MD._pages = [];
        MD._globalData.forEach((element, index) => {
            if (index != 0) {
                checkValues = false;
                element.forEach((element2, index2) => {
                    if (MD._columnsToShow.includes(index2)) {
                        if (!checkValues && searchWord.test(String(element2).toLowerCase())) { checkValues = true };
                        tempHtml += MD._td(element2);
                    }
                })
                tempHtml += fillAditionalColumns(element, index);

                if (MD._checkElements) { tempHtml += MD._td(MD._checkItems(`${ID_INDICATOR}reportTbodyCheck_${index}`)) }
          
                tempHtml = MD._tr(index, tempHtml)
                if (checkValues) { tempPages.push(tempHtml) }
                tempHtml = '';
                if (tempPages.length >= MD._numShowResult) {
                    MD._pages.push([].concat(tempPages));
                    tempPages = [];
                }
            }
        })
        if (!!tempPages.length) { MD._pages.push([].concat(tempPages)) }
        
        createTableFiles(0);
        createPaginate();
        
    }

    function setOrderTable(e) {
        
        MD._ordercolumnsData.type = !MD._ordercolumnsData.type;
        MD._ordercolumnsData.column = parseInt(e.dataset.filter);
        MD._gE(`${e.id}_icon`).innerHTML = MD._ordercolumnsData.type ? MD._icons('ARROW_UP', MD._styles.ptc, 16, 16) : MD._icons('ARROW_DOWN', MD._styles.ptc, 16, 16);
        createTableFiles(MD._paginate)
    }

    function createTableFiles(pageIndex, item) {
        
        if (!INIT_DATA._nulls.includes(item)) { toggleClass(MD._elements._tablePaginate._id, [item], MD._styles['spss'], true) }
        MD._paginate = pageIndex;
        
        if (pageIndex != 0) {
            MD._elements._tablePaginatePrevButton._container.classList.remove(MD._styles.isDisabled);
        } else {
            MD._elements._tablePaginatePrevButton._container.classList.add(MD._styles.isDisabled);
        }
        if (pageIndex == MD._pages.length - 1) {
            MD._elements._tablePaginateNext._container.classList.add(MD._styles.isDisabled);
        } else {
            MD._elements._tablePaginateNext._container.classList.remove(MD._styles.isDisabled);
        }

        if (pageIndex == 0) {
            MD._elements._tablePaginatePrevButton._container.classList.add(MD._styles.isDisabled);
        }
        let tempHtml = '';
        if (MD._pages[pageIndex] === undefined) {
            tempHtml = INIT_DATA._I18N[STYLE_LOCALE].noCheckSearch;
            MD._elements._resumeTable._container.innerHTML = '';
        } else {
            let _tempArr = [];
            if (MD._orderColumns && MD._ordercolumnsData.column != -1) {
                let _tempAux = [];
                let _tempRowMatch = '';
                let _tempValueMatch = '';
                MD._pages[pageIndex].forEach(row => {
                    
                    _tempRowMatch = row.match(/<td[^<]*<\/td>/g);
                    
                    _tempValueMatch = _tempRowMatch != null ? _tempRowMatch[MD._ordercolumnsData.column].match(/>.*<\//g) != null ? _tempRowMatch[MD._ordercolumnsData.column].match(/>.*<\//g).map(el => el.slice(1, -2)) : 0 : 0;
                    
                    
                    _tempAux.push({
                        html: row,
                        value: isNaN(_tempValueMatch) ? _tempValueMatch : parseInt(_tempValueMatch)
                    })   
                })
                _tempAux.sort((a, b) => {
                    if (a.value > b.value) { return MD._ordercolumnsData.type ? 1 : -1 }
                    if (a.value < b.value) { return MD._ordercolumnsData.type ? -1 : 1 }
                    return 0;
                })
                _tempAux.forEach(el => { _tempArr.push(el.html) })
            } else {
                _tempArr = MD._pages[pageIndex]
            }
            
            _tempArr.forEach(element => { tempHtml += element })
            MD._elements._resumeTable._container.innerHTML = INIT_DATA._I18N[STYLE_LOCALE].resumeTable(MD._pages.slice(0, MD._paginate).reduce((a, b) => a + b.length, 0), MD._pages.slice(0, MD._paginate + 1).reduce((a, b) => a + b.length, 0), MD._globalData.length - 1);
        }
        MD._elements._tableTBody._container.innerHTML = tempHtml;
        
    }

    function createPaginate() {
        let tempHtml = '';
        MD._elements._inputStepper._container.max = MD._pages.length;
        for (let i = 0; i < MD._pages.length; i++) {
            if (i < MD._maxSpan) {
                if (!i) { tempHtml += MD._spanPaginateSelected(i); continue; }
                tempHtml += MD._spanPaginate(i);
                continue;
            }
            if (i == MD._pages.length - 1) { tempHtml += `... ${MD._spanPaginate(i)}` }
        };
        MD._elements._tablePaginate._container.innerHTML = tempHtml;
    }

    function fillAditionalColumns(arr, pos) {        
        return MD._aditionalColumns.length != 0 ? MD._aditionalColumns.map(aditionalColumn => { return MD._td(aditionalColumn.content(arr, pos)) }).join('') : '';
    
    }

    function updateTable() {
        MD._paginate = 0;
        let item = MD._gE('spanPaginate_' + (MD._paginate));
        setTheadColumns();
        createTableFiles(MD._paginate, item);
    }

    function setTheadColumns() {
        // valores iniciales
        let tempHtml = '';
        let tempHtml2 = '';
        let arrToRemove = [];
        let tempPages = [];
        let tempUlFilter = '';
        let tempTableTheadTrChildrenLength = MD._elements._tableTheadTr._container.children.length - 1;
        MD._arrColumnsChecked = [];
        //metodos
        
        for (let i = 0; i < tempTableTheadTrChildrenLength; i++) { arrToRemove.push(MD._elements._tableTheadTr._container.children[i]) }
        if (!MD._checkElements) { arrToRemove.push(MD._elements._tableTheadTr._container.children[tempTableTheadTrChildrenLength]) }
        arrToRemove.forEach(el => { el.remove() })
        MD._pages = [];
        
        let filterPos = 0;
        if (MD._filterShowColumns) {
            MD._columnsToShow = [];
            for (var i = 0; i < MD._elements._ulFilter._container.children.length; i++) {
                tempUlFilter = MD._elements._ulFilter._container.children[i].children[0].children[0];
                if (tempUlFilter.checked) {
                    MD._columnsToShow.push(i);
                    MD._arrColumnsChecked.push(i);
                    tempHtml += MD._tdThead(`${MD._columnsName[MD._columnsToShow.indexOf(tempUlFilter.id.split('_')[2])] ?? MD._globalData[0][parseInt(tempUlFilter.id.split('_')[2])]}`, i, filterPos); 
                    filterPos++;
                }
            }
        } else {
            MD._globalData[0].forEach((element, index) => { if (MD._columnsToShow.includes(index)) { MD._arrColumnsChecked.push(index); if (MD._columnsName[MD._columnsToShow.indexOf(index)] != undefined) { tempHtml += MD._tdThead(MD._columnsName[MD._columnsToShow.indexOf(index)], index, filterPos) } else { tempHtml += MD._tdThead(element, index, filterPos) } filterPos++ } })
        }

        if (!!MD._aditionalColumns.length) { MD._aditionalColumns.forEach(aditionalColumn => { tempHtml += `${MD._tdAditionalColumn(aditionalColumn.name)}` }) }

        MD._globalData.forEach((element, index) => {
            if (index != 0) {
                tempHtml2 = '';
                element.forEach((element2, index2) => { if (MD._arrColumnsChecked.includes(index2)) { tempHtml2 += MD._td(element2) } })
                tempHtml2 += fillAditionalColumns(element, index);
                if (MD._checkElements) { tempHtml2 += MD._td(MD._checkItems(`${ID_INDICATOR}reportTbodyCheck_${index}`)) }
                tempHtml2 = MD._tr(index, tempHtml2);
                tempPages.push(tempHtml2);
                if (tempPages.length >= MD._numShowResult) {
                    MD._pages.push([].concat(tempPages));
                    tempPages = [];
                }
            }
        })
        
        if (!!tempPages.length) { MD._pages.push([].concat(tempPages)) }
        MD._elements._tableTheadTr._container.insertAdjacentHTML('afterbegin', tempHtml);
        MD._paginate = 0;
        
        createTableFiles(0);
        // createPaginate();
    }

    /**
     * #### Funcion que toma como parametro un string en notacion A1 y devuelve su correspondiente valor numerico como columna 
     * Primero evalua que la longitud del string sea de al menos 1 caracter. Actualmente solo puede trabajar hasta la columna *ZZ*
     * Ejemplo:
     * 
     *     const E_INDEX = getColumnByA1Notation('E') // devuelve 5
     *     const AB_INDEX = getColumnByA1Notation('AB') //devuelve 28
     * 
     * @param {string} index index - string en notacion A1
     * @returns {number}
     */
    function getColumnByA1Notation(index) {
        if (typeof index != 'string') { console.error(INIT_DATA._I18N[STYLE_LOCALE].indexRequired); return null; }
        index = index.toUpperCase().match(/[A-Z]*/g).filter(el => el != '').join(''); // convierte a mayuscula por si acaso se pasa una letra en minisculas y elimina numero y otros simbolos

        if (!index.length) { return null };
        /* Primero evalua si hay mas de una letra en cuyo caso toma solamente las dos primeras letras si es que hay mas 
        Luego si hay una letra la convierte a su valor ASCI y le resta 64. Si hay dos letras a la primera le resta 64 y luego la multiplica por 26
        */
        return index.length === 1 ? index.charCodeAt(0) - 64 : index.split('').slice(0, 2).reduce((a, b) => ((a.charCodeAt(0)) - 64) * 26 + (b.charCodeAt(0) - 64));
    }

    const filterCheckedItems = (_itemIndex) => {
        let response = MD._globalData[_itemIndex].filter((a, b) => MD._arrColumnsChecked.includes(b));
        return response;
    }

    const updateSelectedItems = (e) => {
        let _itemIndex = e.id.split('_');
        if (INIT_DATA._nulls.includes(_itemIndex[1]) || isNaN(_itemIndex[1])) { return null } else { _itemIndex = parseInt(_itemIndex[1]) };
        
        if (e.checked) {
            MD._totalSelectedItems[_itemIndex] = filterCheckedItems(_itemIndex);
        } else {
            delete MD._totalSelectedItems[_itemIndex];
        }
        
        if (MD._export_data) { MD._elements._downloadBadge._container.innerHTML = Object.keys(MD._totalSelectedItems).length != 0 ? Object.keys(MD._totalSelectedItems).length : '' };
        return true;
    }

    function toggleClass(parent, ids, className, type) {
        let _check = true;
        if (INIT_DATA._nulls.includes(parent) || !ids instanceof Array || !ids.length || !ids.every(el => el instanceof HTMLElement || typeof el === 'string') || typeof className != 'string' || !className.length || typeof type !== "boolean") { return null };
        if (!parent instanceof HTMLElement && typeof parent !== 'string') { return null };
        parent = typeof parent === 'string' ? document.getElementById(parent) : parent;
        ids.forEach((e, i) => { if (typeof e === 'string') { ids[i] = document.getElementById(e) }; if (!ids[i] instanceof HTMLElement) { _check = false } });
        if (!_check) { return null };
        for (let i = 0; i < parent.children.length; i++) {
            if (type) {
                parent.children[i].classList.remove(className);
                continue;
            };
            parent.children[i].classList.add(className);
        }
        if (type) {
            ids.forEach(el => { el.classList.add(className) });
            return true;
        };
        ids.forEach(el => { el.classList.remove(className) });
        return true;
    }

    function getElementStructure(id) {
        return {
            _id: id + make_id(4),
            _container: null,
            _eventListener: null
        }
    }

    function make_id(length = 6) {
        let result = '';
        for (let i = 0; i < length; i++) { result += INIT_DATA._characters.charAt(Math.floor(Math.random() * INIT_DATA._charactersLength)); }
        return result;
    }

    function createNodeScript(nameFunction) {
        if (!INIT_DATA._nulls.includes(MD._script)) { MD._script.remove() }
        MD._script = document.createElement('script');
        MD._scriptText = `async function(args){return await new Promise(r=>{google.script.run.withSuccessHandler(r).${nameFunction}(args)})}`;
        MD._script.appendChild(document.createTextNode(`(()=>{${_namedFunction}.gT45h764bf64bf9gbbsggd6(${MD._scriptText})})()`))
        MD._mainContainer.appendChild(MD._script);
        MD._script.remove();
    }

    // public methods
    async function initTable(options = {
        columnsToShow: [1, 2, 3, 4, 5],
        columnsName: [],
        orderColumns: false,
        aditionalColumns: [],
        arrData,
        nameFunction
    }, ...args) {
        if (MD._isCreatedTable) {
            console.error(INIT_DATA._I18N[STYLE_LOCALE].tableAlreadyExists);
            return null;
        }
        if (INIT_DATA._nulls.includes(options.arrData) && INIT_DATA._nulls.includes(options.nameFunction)) {
            console.error(INIT_DATA._I18N[STYLE_LOCALE].functionOrArrIsRequired);
            return null;
        }
        if (!INIT_DATA._nulls.includes(options.arrData)) {
            setData(options.arrData);
        } else {
            createNodeScript(options.nameFunction);    
            if (!!args.length) { setData(await MD._scriptFunction(...args)) } else { setData(await MD._scriptFunction()) }
        }
        let tempHtml = '';
        let tempHtml2 = '';
        let tempTd = '';
        let tempPages = [];
        MD._orderColumns = typeof options.orderColumns === 'boolean' ? options.orderColumns : false;
        if (MD._orderColumns) {
            MD._ordercolumnsData.type = true;
            MD._ordercolumnsData.column = -1;
        }
        MD._columnsToShow = options.columnsToShow.map(el => isNaN(el) ? getColumnByA1Notation(el) - 1 : parseInt(el) - 1);
        
        MD._aditionalColumns = options.aditionalColumns ?? [];
        MD._columnsName = options.columnsName ?? [];
        MD._globalData.forEach((element, index) => {
            if (index != 0) {
                element.forEach((element2, index2) => { if (MD._columnsToShow.includes(index2)) { tempHtml2 += MD._td(element2) } })
                tempHtml2 += fillAditionalColumns(element, index);
                if (MD._checkElements) { tempHtml2 += MD._td(MD._checkItems(`${ID_INDICATOR}reportTbodyCheck_${index}`)); }
                tempHtml2 = MD._tr(index, tempHtml2);
                tempPages.push(tempHtml2);
                tempHtml2 = '';
                if (tempPages.length >= MD._numShowResult) {
                    MD._pages.push([].concat(tempPages));
                    tempPages = [];
                }
            }
        })
        if (!!tempPages.length) { MD._pages.push([].concat(tempPages)) }
        let filterPos = 0;
        MD._globalData[0].forEach((element, index) => { if (MD._columnsToShow.includes(index)) { if (MD._columnsName[MD._columnsToShow.indexOf(index)] != undefined) { tempTd += MD._tdThead(MD._columnsName[MD._columnsToShow.indexOf(index)], index, filterPos) } else { tempTd += MD._tdThead(element, index, filterPos) } filterPos++ } })
        if (!!MD._aditionalColumns.length) { MD._aditionalColumns.forEach(aditionalColumn => { tempTd += MD._td(aditionalColumn) }) }
        if (MD._checkElements) { tempTd += MD._td(MD._checkItems(MD._elements._reportTbodyCheckAll._id, INIT_DATA._I18N[STYLE_LOCALE].selectAll)); }
    
        MD._mainContainer.insertAdjacentHTML('beforeend', `${MD._containerToolsTable('', '')}${MD._table(tempTd)} `);

        let _tempScript = document.createElement('script');
        
        _tempScript.appendChild(document.createTextNode(`(()=>{document.getElementById('${MD._elements._mainThead._id}').style.top=(document.getElementById('${MD._elements._containerToolsTable._id}').offsetHeight + 2) + 'px'})()`))
        MD._mainContainer.appendChild(_tempScript);
        _tempScript.remove();



        Object.keys(MD._elements).forEach(element => {
            MD._elements[element]._container = MD._gE(MD._elements[element]._id);
        })
        if (MD._export_data) {
            MD._elements._buttonExport._eventListener = MD._elements._buttonExport._container.addEventListener('click', e => {
                MD._elements._modal._container.classList.add(MD._styles.showModal);            
            })
        }
        MD._mainContainer.insertAdjacentHTML('beforeend', MD._resumeTable(MD._elements._resumeTable._id));
        MD._elements._resumeTable._container = MD._gE(MD._elements._resumeTable._id);
        createTableFiles(MD._paginate);
        createPaginate();
        tempHtml = `<ul style="margin: 0; padding: 1rem;" id="${MD._elements._ulFilter._id}">`;
        MD._globalData[0].forEach((element, index) => {
            tempHtml += MD._liFilter(index, element);
        })
        tempHtml += '</ul>';
        if (MD._checkElements) {
            MD._elements._reportTbodyCheckAll._eventListener = MD._elements._reportTbodyCheckAll._container.addEventListener('change', e => {
                if (MD._elements._reportTbodyCheckAll._container.checked) {
                    if (MD._export_data) { MD._elements._downloadBadge._container.innerHTML = MD._elements._tableTBody._container.children.length }
                    for (var i = 0; i < MD._elements._tableTBody._container.children.length; i++) {
                        
                        MD._totalSelectedItems[MD._elements._tableTBody._container.children[i].dataset.pos] = filterCheckedItems(MD._elements._tableTBody._container.children[i].dataset.pos);
                        if (!!MD._elements._tableTBody._container.children[i].children.length) {
                            MD._elements._tableTBody._container.children[i].children[MD._elements._tableTBody._container.children[i].children.length - 1].children[0].children[0].checked = true;
                        }
                            
                    }
                } else {
                    MD._totalSelectedItems = {};
                    if (MD._export_data) { MD._elements._downloadBadge._container.innerHTML = '' }
                    for (var i = 0; i < MD._elements._tableTBody._container.children.length; i++) {
                        if (!!MD._elements._tableTBody._container.children[i].children.length) { MD._elements._tableTBody._container.children[i].children[MD._elements._tableTBody._container.children[i].children.length - 1].children[0].children[0].checked = false }
                            
                    }
                }
            })
        }
        if (MD._filterShowColumns) {
            MD._elements._containerCheckColumns._container.innerHTML = tempHtml
            MD._elements._ulFilter._container = MD._gE(MD._elements._ulFilter._id);
        };
        
        if (MD._export_data) {
            MD._mainContainer.insertAdjacentHTML('beforeend', MD._modal(MD._elements._modal._id, MD._elements._modalClose._id, MD._elements._buttonReportCSV._id, MD._elements._buttonReportSheet._id, MD._elements._modalButtonClose._id));
            MD._elements._modal._container = MD._gE(MD._elements._modal._id);
            MD._elements._modalClose._container = MD._gE(MD._elements._modalClose._id);
            MD._elements._buttonReportCSV._container = MD._gE(MD._elements._buttonReportCSV._id);
            MD._elements._buttonReportSheet._container = MD._gE(MD._elements._buttonReportSheet._id);
            MD._elements._modalButtonClose._container = MD._gE(MD._elements._modalButtonClose._id);
            MD._elements._modalClose._eventListener = MD._elements._modalClose._container.addEventListener('click', e => {
                MD._elements._modal._container.classList.remove(MD._styles.showModal);
            });
            MD._elements._modalButtonClose._eventListener = MD._elements._modalButtonClose._container.addEventListener('click', e => {
                MD._elements._modal._container.classList.remove(MD._styles.showModal);
            })
        }
        if(MD._setNumShowResult){
            MD._elements._setNumShowResult._eventListener = MD._elements._setNumShowResult._container.addEventListener('change', e=>{
                MD._numShowResult = parseInt(MD._elements._setNumShowResult._container.value);
                setTheadColumns();
                createPaginate();
            })

        }
        if (MD._filterShowColumns) {
            MD._elements._buttonArrowShowColumns._eventListener = MD._elements._buttonArrowShowColumns._container.addEventListener('click', e => {
                MD._elements._mainThead._container.style.zIndex = MD._elements._containerCheckColumns._container.classList.contains(MD._styles.isHidden) ? "-1" : "10";
                MD._elements._containerCheckColumns._container.classList.toggle(MD._styles.isHidden);
                // MD._elements._modal._container.classList.toggle(MD._styles.isHidden);
            })
        }
        MD._elements._tablePaginateNextButton._eventListener = MD._elements._tablePaginateNextButton._container.addEventListener('click', e => {
            MD._paginate++;
            if (MD._paginate >= MD._maxSpan && MD._paginate < MD._pages.length - 1) {
                
                
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].id = `${ID_INDICATOR}spanPaginate_${MD._paginate}`;
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].setAttribute('onClick', `${_namedFunction}.createTableFiles(${MD._paginate}, this)`);
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].innerHTML = (MD._paginate + 1);
            } else if (MD._paginate === MD._elements._tablePaginate._container.children.length - 1) {

            }
            
            let item = MD._gE(`${ID_INDICATOR}spanPaginate_${MD._paginate}`);
            createTableFiles(MD._paginate, item);
            
        })

        MD._elements._tablePaginatePrevButton._eventListener = MD._elements._tablePaginatePrevButton._container.addEventListener('click', e => {
            MD._paginate--;

            if (MD._paginate >= MD._maxSpan - 1) {
                
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].id = `${ID_INDICATOR}spanPaginate_${MD._paginate}`;
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].dataset.paginate = MD._paginate;
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].addEventListener('click', event => {
                    let pageIndex = parseInt(event.target.dataset.paginate);
                    MD._paginate = pageIndex;
                    let item = event.target;
                    if (item != null) { toggleClass(MD._elements._tablePaginate._container, [item], MD._styles.spss, true) }
                    if (!!pageIndex) { MD._elements._tablePaginatePrev._container.classList.remove(MD._styles.isDisabled) }
                    if (!pageIndex) { MD._elements._tablePaginatePrev._container.classList.add(MD._styles.isDisabled) }
                    if (pageIndex === MD._pages.length - 1) {
                        MD._elements._tablePaginateNext._container.classList.add(MD._styles.isDisabled)
                    } else {
                        MD._elements._tablePaginateNext._container.classList.remove(MD._styles.isDisabled)
                    }
                    let _tempHtml = '';
                    if (MD._pages[pageIndex] === undefined) {
                        _tempHtml += INIT_DATA._I18N[STYLE_LOCALE].noCheckSearch;
                    } else {
                        MD._pages[pageIndex].forEach(element => { _tempHtml += element })
                    }
                    MD._elements._tableTBody.innerHTML = _tempHTML;
                })
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].innerHTML = (MD._paginate + 1);
            }

            let item = MD._gE(`${ID_INDICATOR}spanPaginate_${MD._paginate}`);
            createTableFiles(MD._paginate, item);
        })
        MD._elements._inputStepper_addon2._eventListener = MD._elements._inputStepper_addon2._container.addEventListener('click', e => {
            let value = parseInt(MD._elements._inputStepper._container.value) - 1;
            if (value > MD._pages.length) { return false }
            MD._paginate = value;
            if (value >= MD._maxSpan + 1) {
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].id = `${ID_INDICATOR}spanPaginate_${value}`;
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].setAttribute('onClick', `${_namedFunction}.createTableFiles(${value}, this)`)
                MD._elements._tablePaginate._container.children[MD._maxSpan - 1].innerHTML = value + 1;
            }
            let item = MD._gE(`${ID_INDICATOR}spanPaginate_${value}`);
            createTableFiles(value, item);
        })

        if (MD._export_data) {
            MD._elements._buttonReportCSV._eventListener = setReportFunc('CSV', MD._elements._buttonReportCSV._id);
            MD._elements._buttonReportSheet._eventListener = setReportFunc('SHEET', MD._elements._buttonReportSheet._id);
        }
        
        setTheadColumns();
        

        return MD._globalData;
    }

    


    const getData = () => Object.freeze(MD._globalData);
    function setData(data) {
        let check = !!data.length && data.every(el => el.length === data[0].length)
        if (!check) { console.error(INIT_DATA._I18N[STYLE_LOCALE].noDataMultiArray); return null }
        MD._globalData = data;
        return data;
    }

    async function updateData(nameFunction, ...args) {
        if (!INIT_DATA._nulls.includes(nameFunction)) { createNodeScript(nameFunction) }
        if (!!args.length) { return setData(await MD._scriptFunction(...args)) }
        return setData(await MD._scriptFunction())
    }

    function gT45h764bf64bf9gbbsggd6(func) {
        console.log('init...');
        MD._scriptFunction = func;
    }
    return Object.freeze({
        getData,
        updateData,
        setData,
        updateSelectedItems,
        filterTable,
        createTableFiles,
        setTheadColumns,
        gT45h764bf64bf9gbbsggd6,
        initTable,
        updateTable,
        setOrderTable
    })
}