// interface Jquery {
//      cubeportfolio: (options: any) => any
// }

interface JQuery {
    cubeportfolio(options?:any):JQuery;
    cubeportfolio(type?:any, html?: any):JQuery;
}

// interface CubePortfolioOptions
// {
//     color?: string;
//     backgroundColor?: string;
// }