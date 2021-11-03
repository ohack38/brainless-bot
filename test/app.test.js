
  const getUsd = require('../app');
  const axios = require('axios');
  
  jest.mock('axios');
  
  it('returns the title of the first album', async () => {
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
