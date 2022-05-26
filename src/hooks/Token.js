const Token = async (email) => {
  console.log(email);
  await fetch("https://fathomless-wave-64649.herokuapp.com/gettoken", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
    });
};

export default Token;
