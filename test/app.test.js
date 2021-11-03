
  const axios = require('axios');
  const getUsd = require('../app')
  jest.mock('axios');
  
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