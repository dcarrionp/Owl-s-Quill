import { enviroment } from "./enviroment";

describe('Environment', () => {
  it('should have a WS_PATH property', () => {
    expect(enviroment.WS_PATH).toBeDefined();
  });

  it('WS_PATH should be a string', () => {
    expect(typeof enviroment.WS_PATH).toBe('string');
  });
});
