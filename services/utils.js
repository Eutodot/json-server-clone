const data = require("../data/data")
const pluralize = require('pluralize')

const formatData = (data, query, name) => {
    const embed = query._embed
    const start = query._start
    const end = query._end
    const limit = query._limit
    const sort = query._sort
    const order = query._order
    const page = query._page
    const perPage = query._per_page

    let response = [...data]
    
    response = filterData(response, query)
    response = sortData(response, sort, order)
    response = sliceData(response, {start, end, limit})
    response = response.map(item => embedData(item, embed, name))
    response = paginateData(response, page, perPage)

    return response
}

const sliceData = (data, { start, end, limit }) => {
    if (!data || data.length === 0){
        return []
    }

    if (start && end){
        return data.slice(start, end)
    }
    
    if (start && limit){
        return data.slice(start, start + limit)
    }
    
    if (end && limit){
        return data.slice(end - limit, end)
    }
    
    if (limit){
        return data.slice(0, limit)
    }
    
    if (start){
        return data.slice(start, data.length)
    }

    if (end){
        return data.slice(0, end)
    }

    return data
}

const filterData = (data, query) => { 
    if (!data || data.length === 0){
        return []
    }

    if (!query || Object.keys(query).length === 0){
        return data
    }
    
    let filteredData = [...data]
    
    for (const key in query){
        if (key[0] === '_'){
            continue
        }
        
        const condition = key.split('_')[1]
        const keyName = key.split('_')[0]
        const value = query[key]


        filteredData = filteredData.filter(item => filterItem(item, keyName, value, condition))
    }   

    return filteredData
}

const sortData = (data, sort, order = 'asc') => {
    if (!data || data.length === 0){
        return []
    }

    if (!sort){
        return data
    }

    const sortedData = [...data]

    sortedData.sort((a, b) => {
        const aProperty = a[sort]
        const bProperty = b[sort]

        if (!isNaN(aProperty) && !isNaN(bProperty)){
            if (order.toLowerCase() === 'desc'){
                return bProperty - aProperty
            } else {
                return aProperty - bProperty
            }
        }

        const aPropertySrt = aProperty.toUpperCase()
        const bPropertyStr = bProperty.toUpperCase()
        if (aPropertySrt < bPropertyStr) {
            return order.toLowerCase() === 'desc' ? 1 : -1
        }
        if (aPropertySrt > bPropertyStr) {
            return order.toLowerCase() === 'desc' ? -1 : 1
        }

        return 0
    })
    
    return sortedData
}

const paginateData = (data, pageNum, perPage = 10) => {
    if (pageNum < 1){
        return data
    }
    const items = data.length
    const pages = Math.ceil(data.length / perPage)
    const page = Number(pageNum) > pages ? pages : Math.floor(Number(pageNum))
    const first = 1
    const last = pages
    const prev = page - 1 < first ? null : page - 1
    const next = page + 1 > last ? null : page + 1
    const pageStart = (page - 1) * perPage
    const pageData = sliceData(data, {start: pageStart, end: pageStart + perPage})
    
    const response = {
        first,
        prev,
        next,
        last,
        pages,
        items,
        data: pageData
    }

    return response
}

const embedData = (data, embed, name) => {
    if (!embed){
        return data
    }

    const embedList = Array.isArray(embed) ? embed : [embed]
    const embedData = embedList.map(item => item.toLowerCase())

    
    const updatedData = {...data}
    
    embedData.map((item) => {
        if (pluralize.isSingular(item)){
            if (embedData.includes(item)){
                // updatedData[item] = getUserById(userId)
                const id = data[item + 'Id']
                updatedData[item] = getSingleDataById(pluralize.plural(item), id)
            }
        } else {
            if (embedData.includes(item)){
                // updatedData[item] = getUserById(userId)
                const id = data.id
                const nameId = `${name.toLowerCase()}Id`
                
                updatedData[item] = getMultipleDataById(item, id, nameId)
            }
        }

        
    })
    
    return updatedData
}

const getSingleDataById = (collection, id) => {
    if (!collection || !id){
        return {}
    }

    const foundCollection = data[collection]
    
    if (!foundCollection){
        return {}
    }

    const foundItem = foundCollection.find(item => item.id === id)

    return foundItem
}

const getMultipleDataById = (collection, id, nameId) => {
    if (!collection || !id){
        return []
    }

    const foundCollection = data[collection]
    
    if (!foundCollection){
        return []
    }

    const foundItems = foundCollection.filter(item => item[nameId] === id)

    return foundItems
}

const searchInItem = (item,keyName, value) => {
    for (const property in item){
        if (typeof item[property] === 'string'){
            if (item[property].includes(value)){
                return true
            }
        }
        
        if (typeof item[property] === 'array'){
            if (item[property].toString().includes(value)){
                return true
            }
        }
        
        if (typeof item[property] === 'object'){
            if (searchInItem(item[property], keyName, value)){
                return true
            }
        }
    }

    return false
}
const filterItem = (item, keyName, value, condition) => {
    if (keyName === 'q' && !condition){
        return searchInItem(item, keyName, value)
    }

    const itemValue = item[keyName]

    if (!condition){
        if (typeof itemValue === 'string'){
            return itemValue.toLowerCase() === value.toLowerCase()
        }

        if (typeof itemValue === 'number'){
            return itemValue == value
        }
        
        return
    } 
    
    
    if (condition === 'lt'){
        return itemValue < value
    }
    if (condition === 'lte'){
        return itemValue <= value
    }
    if (condition === 'gt'){
        return itemValue > value
    }
    if (condition === 'gte'){
        return itemValue >= value
    }
    if (condition === 'ne'){
        return itemValue != value
    }
}



module.exports = { formatData, sliceData, filterData, sortData, embedData, getSingleDataById, getMultipleDataById }