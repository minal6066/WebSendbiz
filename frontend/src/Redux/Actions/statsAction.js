export const statsActionTypes = {
  GET_STATISTICS_DATA: 'GET_STATISTICS_DATA',
};
export const getstatsData = (stats_data) => {
  return {
    type: statsActionTypes.GET_STATISTICS_DATA,
    stats_data,
  };
};
