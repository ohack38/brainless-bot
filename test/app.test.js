
  const getUsd = require('../app');
  const axios = require('axios');
  
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
    expect(dollar).toEqual(61865);
    
  });
