const input = document.getElementById("ip");
const peas = document.getElementById("peas");
const protocol = document.getElementById("protocol");

function convertIp() {
  const ip = input.value.trim();
  const prefix = protocol.value;

  if (!isValidIp(ip)) {
    peas.innerHTML = "<p>please enter a valid ip</p>";
    return;
  }

  const decimalv1 = ip;

  const ipToHex = (ip) => {
    const hexv1 = ip
      .split(".")
      .map((part) => "0x" + parseInt(part).toString(16).padStart(2, "0"))
      .join(".");
    const hexv2 =
      "0x" +
      ip
        .split(".")
        .map((part) => parseInt(part).toString(16).padStart(2, "0"))
        .join("");
    const hexv4 = ip
      .split(".")
      .map((part) => "0x" + parseInt(part).toString(16).padStart(2, "0"))
      .join(".");
    return {
      hexv1,
      hexv2,
      hexv4,
    };
  };

  const { hexv1, hexv2, hexv4 } = ipToHex(ip);

  const hexv3 = hexv1.split(".")[0] + ".0x" + hexv2.slice(4);

  const octalv1 = ip.split(".").reduce((acc, cur, i, arr) => {
    return (
      acc + "0" + parseInt(cur).toString(8) + (arr.length - 1 !== i ? "." : "")
    );
  }, "");

  const octalv2 = ip.split(".").reduce((acc, cur, i, arr) => {
    return (
      acc +
      "0".repeat(Math.floor(Math.random() * 9) + 1) +
      parseInt(cur).toString(8) +
      (arr.length - 1 !== i ? "." : "")
    );
  }, "");

  const percentv1 = [...ip].reduce((acc, cur) => {
    return acc + "%" + cur.charCodeAt(0).toString(16);
  }, "");

  const [o1, o2, o3, o4] = ip.split(".");
  classb = [o1, o2, o3 * 256 + +o4].join(".");
  classa = [o1, o2 * 256 ** 2 + o3 * 256 + +o4].join(".");
  dwordv1 = [o1 * 256 ** 3 + o2 * 256 ** 2 + o3 * 256 + +o4].toString();

  const octalv3 = "0" + parseInt(dwordv1).toString(8);

  const mixedv1 =
    decimalv1.split(".")[0] +
    "." +
    hexv1.split(".")[1] +
    "." +
    octalv2.split(".")[2] +
    "." +
    hexv1.split(".")[3];

  const unicode = ip
    .split(".")
    .reduce((acc, cur, i, arr) => {
      cur.split("").forEach((n) => {
        if (n != "0") {
          acc += String.fromCodePoint(0x245f + parseInt(n));
        } else {
          acc += String.fromCodePoint(0x24ea);
        }
      });
      return acc + "．";
    }, "")
    .slice(0, -1);

  const variations = [
    decimalv1,
    classb,
    classa,
    dwordv1,
    hexv1,
    hexv2,
    hexv3,
    hexv4,
    octalv1,
    octalv2,
    octalv3,
    percentv1,
    mixedv1,
    unicode,
  ];

  peas.innerHTML = "";

  for (let i = 0; i < variations.length; i++) {
    peas.innerHTML += `<a href="${prefix}://${variations[i]}">${variations[i]}<br/>`;
  }
}

function isValidIp(ip) {
  const pattern =
    /^([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])\.([01]?\d{1,2}|2[0-4]\d|25[0-5])$/;
  return pattern.test(ip);
}

convertIp();

input.addEventListener("keyup", convertIp);
protocol.addEventListener("change", convertIp);

document.addEventListener("submit", (e) => {
  e.preventDefault();
});
