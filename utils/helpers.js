module.exports = {
    format_date: (timestamps) => {
      // Format date as MM/DD/YYYY
      return timestamps.toLocaleDateString();
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },    
  };