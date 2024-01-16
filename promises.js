async function main() {
  async function takesTime (length) {
    let i = 0
    return new Promise((resolve, reject) => {
      if (typeof length !== 'number') { reject('length must be a number') };
      new Array(length).forEach((val) => {
        i = val;
      });
      resolve(i);
    } )
  };

  // Immediate assignment to result, before async function has completed: 
  const result = takesTime(10000000);

  console.log(result); // 'Promise { <pending> }'
  
  // .then promise chaining syntax:
  takesTime(10000000).then((res) => { 
    console.log(res); // '0' - the value passed to resolve()
  }, (error) => {
    // This would be executed if the typeof arg passed to takesTime() !-== 'number'.
    console.log(`${error} represents the value passed to reject(). This line will not execute because the Promise was fulfilled`); 
  });

  // async await syntax:
  try {
    const rejectedResult = await takesTime('ten');
    console.log('This line will not execute because the Promise was rejected');
  } catch (e) {
    console.log(e); // 'length must be a number'
  }
}

main();
