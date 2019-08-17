/**
 * @file Haoide oauth2 config information
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

// Express start server port
export let port: number = 3001;

// express server enpoint
export let entryPoint = `http://localhost:${port}`;

/**
 * Client credential information of haoide-vscode
 */
export let appConfig: { [key: string]: any } = {
    "clientId": "3MVG9Y6d_Btp4xp5NwcRLAU5Ct0.VFMJtbn3t8aZN60XbLlKqErExeIYx3lVISN8SCp_8QUcxSWwhNBXWJ2Dj",
    "clientSecret": "8A91DE29031A42D0A5C779C798C2121F028B22659B8330886A49266C0068670B",
    "redirectUri": `${entryPoint}/oauth/callback`
};