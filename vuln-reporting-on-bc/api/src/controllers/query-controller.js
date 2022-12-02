'using strict';
const common = require('./utils/common');
const queryHelper = require("./chaincode-query-helper");
const appConfig = require('../config');
const Lodash = require('lodash');

function handleQueryRequests(requestPayload, requestType) {
    return new Promise(async (resolve, reject) => {
        let payload = {
            org: requestPayload.org,
            queryFunction: "",
            query: {
                selector: {}
            }
        }
        if (requestPayload.selectors) {
            payload.query.selector = {
                docType: "",
                ...requestPayload.selectors
            };
        } else {
            payload.query.selector = {
                docType: ""
            };
        }
        let sortOption = {
            columns: ["timestamp"],
            sortOrder: ["desc"]
        }
        switch (requestType) {
            case appConfig.requestsType.fetchReports:
                payload.queryFunction = appConfig.chaincodeQueryReports;
                payload.query.selector.docType = appConfig.recordDocType.DocTypeReport;
                sortOption.columns = ["timestamp"];
                sortOption.sortOrder = ["desc"];
                break;
            case appConfig.requestsType.fetchPolicy:
                payload.queryFunction = appConfig.chaincodeQueryPolicy;
                payload.query.selector.docType = appConfig.recordDocType.DocTypePolicy;
                sortOption.columns = ["timestamp"];
                sortOption.sortOrder = ["desc"];
                break;
            case appConfig.requestsType.fetchReward:
                payload.queryFunction = appConfig.chaincodeQueryReward;
                payload.query.selector.docType = appConfig.recordDocType.DocTypeReward;
                sortOption.columns = ["timestamp"];
                sortOption.sortOrder = ["desc"];
                break;
            // case appConfig.requestsType.fetchPerformanceMetrics:
            //     payload.queryFunction = appConfig.chaincodeQueryPerformanceMetrics
            //     payload.query.selector.docType = appConfig.recordDocType.DocTypePerfMetric
            //     payload.query.sort = [{ "timestamp": "desc" }]
            //     payload.query.use_index = "_design/indexPmetricsAsc"
            //     sortOption.columns = ['timestamp', 'iterationNumber', 'clientName'];
            //     sortOption.sortOrder = ['desc', 'asc', 'asc'];
            //     break;
            default:
                return reject(`Unexpected request type ${requestType}`)
        }
        try {
            let dt = await queryChain(payload, requestType);
            // if (requestType === appConfig.requestsType.fetchFetchRewards) {
            //     dt = Lodash.orderBy(dt, sortOption.columns, sortOption.sortOrder);
            //     let groupedDt = Lodash.groupBy(Lodash.orderBy(dt, sortOption.columns, sortOption.sortOrder), 'timestamp');
            //     let sortedKeys = Lodash.sortBy(Object.keys(groupedDt));
            //     let pieData = await computePiechartData(dt, requestType);
            //     let queryResults = {
            //         pie: pieData,
            //         rows: dt,
            //     }
            //     if (sortedKeys.length > 0) {
            //         const latestItem = groupedDt[sortedKeys[sortedKeys.length - 1]];
            //         let lineChartData = await computeLinechartData(latestItem, requestType);
            //         queryResults.lineCharts = { ...lineChartData };
            //     }
            //     return resolve(queryResults);
            // } else {
            //     if (requestType === appConfig.requestsType.fetchPerformanceMetrics) {
            //         dt = await sortdata(dt, sortOption.columns, sortOption.sortOrder)
            //         return resolve(dt);
            //     }
            //     return resolve(dt);
            // }
            return resolve(dt);
        } catch (err) {
            return reject(err);
        }
    });

}
async function sortdata(dt, columns, sortOrder) {
    let sortedData = Lodash.orderBy(dt, columns, sortOrder);
    return sortedData;
}
async function queryChain(payload, requestType) {
    let orgProfile = common.getOrgProfileForTrainingClient(payload.org);
    if (orgProfile.userName) {
        let userData = {
            userName: orgProfile.userName,
            connectionProfilePath: orgProfile.path
        }
        let results = await queryHelper.fetchQueryResults(payload, userData, requestType);
        return results;
    } else {
        return "Unable to org user details";
    }
}
async function computePiechartData(dt, requestType) {
    let colorMap = {
        "client1": "#4DACF1",
        "client2": "#FFA929",
        "client3": "#B056F6",
    }
    if (requestType === appConfig.requestsType.fetchFetchRewards) {
        let pieMap = {}
        let totalAmount = 0;
        await dt.forEach(item => {
            totalAmount += item.amount
            if (!pieMap[item.clientName]) {
                pieMap[item.clientName] = {
                    subTotal: item.amount,
                    pieProp: {
                        name: item.clientName,
                        y: 0,
                        color: colorMap[item.clientName]
                    }
                }
            } else {
                pieMap[item.clientName].subTotal += item.amount
            }
        })
        totalAmount = roundToNearestDecimals(totalAmount, 2);
        pieResults = {
            labels: {},
            chart: []
        }
        for (let k of Object.keys(pieMap)) {
            pieMap[k].subTotal = roundToNearestDecimals(pieMap[k].subTotal, 2)
            pieMap[k].pieProp.y = roundToNearestDecimals((pieMap[k].subTotal / totalAmount) * 100, 2);
            pieResults.labels[k] = { subTotal: pieMap[k].subTotal, percent: pieMap[k].pieProp.y };
            pieResults.chart.push(pieMap[k].pieProp);
        }
        return pieResults;
    }
}
async function computeLinechartData(dt, requestType) {
    if (requestType === appConfig.requestsType.fetchFetchRewards) {
        chartResults = {
            taskId: dt[0].taskId,
            dateCreated: dt[0].dateCreated,
            peformanceLineChart: {
                client1: [[0, 0]],
                client2: [[0, 0]],
                client3: [[0, 0]],
                global: [[0, 0]]
            },
            rewardsLineChart: {
                client1: [[0, 0]],
                client2: [[0, 0]],
                client3: [[0, 0]]
            }
        }

        await dt.forEach(item => {
            chartResults.peformanceLineChart[item.clientName].push([item.iterationNumber, roundToNearestDecimals(item.clientF1score, 3)]);
            chartResults.peformanceLineChart['global'].push([item.iterationNumber, roundToNearestDecimals(item.globalF1Score, 3)]);
            chartResults.rewardsLineChart[item.clientName].push([item.iterationNumber, roundToNearestDecimals(item.amount, 2)]);
        })
        return chartResults;
    }
}
function roundToNearestDecimals(value, decimalValue) {
    let val = parseFloat(value + "");
    val = parseFloat(val.toFixed(decimalValue));
    return val;
}
module.exports = {
    handleQueryRequests
};
