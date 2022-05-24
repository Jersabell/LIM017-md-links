


//   function createPhoneNumber(numbers){
//     let phone = "(yyy) yyy-yyyy";
//        for(let i=0; i<numbers.length; i++){
//          phone= phone.replace("y", numbers[i])
//        }
//       return phone;
//     }
// console.log(createPhoneNumber([1, 2, 3, 4, 5, 6 , 7, 8 , 9, 0]));

function createPhoneNumber(numbers){
    let result = ''
    for(let i=0; i<numbers.length; i++)
      {
       if (i < 3){
         result += `(${numbers[i]})`
  
       }
       else if (i < 6){
         result += ` ${numbers[i]}-`
  
       }
      else {
        result += `${numbers[i]}`
      }
        
      }
     return result
  }

  console.log(createPhoneNumber([1, 2, 3, 4, 5, 6 , 7, 8 , 9, 0]))
  
    