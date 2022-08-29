const createSearchQuery = (query) => {
   // standard filter "kein"
  // => tag, nächster eventDate, city, host, title
  const searchQuery = Object.keys(query).reduce((obj, key) => {
    if(key === 'city'){
      obj[`location.city`] = query[key];
      return obj;
    }

    if(key === 'day'){
      obj['eventDate'] = query[key];
      return obj;
    }

    if(key === 'month' || key === 'year'){
      const queryMonthRegExp = new RegExp(`.${query[key]}`);
      obj['eventDate'] = {$in: [queryMonthRegExp]}
      return obj;
    }
    
    if(key !== 'limit' || key !== 'page'){
      obj[key] = query[key];
      return obj;
    }


    return obj;
  },{});

  return searchQuery;
}

const pageSkip = (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page-1) * limit;

  return {
    limit,
    skip
  }
}

export {
  createSearchQuery,
  pageSkip
}