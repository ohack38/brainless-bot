const axios = require('axios');

  jest.mock('axios');
  const createUrl = (symbol) => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd'
    return url
  }

  async function getUsd() {
    try {
      const response = await axios.get(createUrl('bitcoin'));
    return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  it('returns bitcoin price in dollars', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          usd: 61865,
        }
      ]
    });

    const dollar = await getUsd();

    expect(dollar).toEqual([{"usd": 61865}]);

  });