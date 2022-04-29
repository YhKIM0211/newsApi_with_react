function getCheckboxValue(event)  {
    let result = '';
    if(event.target.checked)  {
      result = event.target.value;
    }else {
      result = '';
    }
    console.log(result);
    // document.getElementById('result').innerText
    //   = result;
  }