export class MockConfigService {
    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
  
    get(...keys: string[]): any {
        if (keys.length > 0 && (keys[0] === 'text' || keys[0] === 'styling')) {
            return '';
        }
  
        return [];
    }
}