//info: JSON = JavaScript Object Notation
//info: API - Application Programming Interface (black box)

/**
 *: Types of API Requests:
 *
 * info: Best Practice
 *: GET:    Get all the specific data
 *: POST:   Create
 *: PUT:    Replaces/Update all
 *: DELETE: Delete
 *: PATCH:  Update specific only
*/

/**
 *: Typical API Request
 *
 *: API URL <Https link to API. Usually called API End-point>
 *: Headers <Usually it's Content-Type or Authorization-token
 *: Type    <Get, Post, Put, Delete, Patch>
 *: Body    <JSON object with requested data> 
 */

 //info: Cypress has built in server which can intercept browser API requests and provide mock response
 //info: Cypress can make API requests and process responses