const parent = document.querySelector(".parent");
const body = document.body;
const AlgoGems = document.getElementById("algoGems");
const nftExplorer = document.getElementById("nftExplorer");
const colorPicker = document.querySelector(".colorPicker");
const cnctBtn = document.querySelector(".MyAlgo");
const historyContainer = document.querySelector(".history-container");

let colorHistory = [];

let defaultNewBgValue = "#000";
events = {
  initial: "",
  drag: "",
  terminate: "",
};

let on_testnet = true;
const chain = on_testnet ? "testnet" : "mainnet";
let userAddress = localStorage.getItem("address")
  ? localStorage.getItem("address").replaceAll('"', "")
  : "";
let connected = localStorage.getItem("address") ? true : false;
const text = localStorage.getItem("address")
  ? `${userAddress[0]}${userAddress[1]}${userAddress[2]}${userAddress[3]}...${userAddress[54]}${userAddress[55]}${userAddress[56]}${userAddress[57]}`
  : "Connect to MyAlgo";
cnctBtn.innerText = text;

if (connected) {
  const toolTip = document.createElement("span");
  toolTip.innerText = "Disconnect";
  toolTip.classList.add("tooltiptext");
  cnctBtn.appendChild(toolTip);
}
if (on_testnet) {
  node_api = "https://node.testnet.algoexplorerapi.io";
  indexer_api = "https://algoindexer.testnet.algoexplorerapi.io";
  explorer_basepoint = "https://testnet.algoexplorer.io/";
  app_id = 75246277;
  nft_ids = [
    75246513, 75246514, 75246516, 75246523, 75246526, 75246528, 75246529,
    75246534, 75246540, 75246544, 75246546, 75246550, 75246552, 75246553,
    75246557, 75246558, 75246559, 75246563, 75246569, 75246572, 75246575,
    75246583, 75246586, 75246591, 75246594, 75246597, 75246599, 75246602,
    75246605, 75246608, 75246612, 75246615, 75246619, 75246625, 75246632,
    75246689, 75246696, 75246699, 75246705, 75246707, 75246715, 75246718,
    75246729, 75246732, 75246734, 75246739, 75246741, 75246747, 75246749,
    75246753, 75246757, 75246762, 75246763, 75246770, 75246776, 75246781,
    75246783, 75246787, 75246791, 75246796, 75246803, 75246805, 75246807,
    75246811, 75246818, 75247142, 75247149, 75247154, 75247159, 75247168,
    75247172, 75247179, 75247182, 75247184, 75247189, 75247191, 75247194,
    75247201, 75247206, 75247207, 75247212, 75247220, 75247227, 75247233,
    75247250, 75247254, 75247263, 75247318, 75247325, 75247330, 75247335,
    75247341, 75247352, 75247355, 75247356, 75247367, 75247375, 75247378,
    75247383, 75247388, 75247393, 75247395, 75247407, 75247413, 75247420,
    75247423, 75247431, 75247447, 75247448, 75247459, 75247463, 75247472,
    75247479, 75247488, 75247501, 75247506, 75247510, 75247516, 75247531,
    75247543, 75247552, 75247557, 75247618, 75247627, 75247649, 75247653,
    75247661,
  ];
} else {
  node_api = "https://node.algoexplorerapi.io";
  indexer_api = "https://algoindexer.algoexplorerapi.io";
  explorer_basepoint = "https://algoexplorer.io/";
  app_id = 711081866;
  nft_ids = [
    710948423, 710949039, 710949639, 710950112, 710950507, 710950966, 710952030,
    710952598, 710953325, 710953805, 710954571, 710955287, 710956328, 710957117,
    710958284, 710958883, 710960825, 710961473, 710963373, 710964157, 710964810,
    710965366, 710965906, 710966336, 710966868, 710967352, 710969045, 710969691,
    710970202, 710970536, 710971025, 710971470, 710972267, 710972708, 710974097,
    710974705, 710975080, 710975526, 710975970, 710976513, 710976964, 710977594,
    710978278, 710979983, 710980501, 710980880, 710981655, 710982083, 710982678,
    710983157, 710983576, 710984044, 710985070, 710985682, 710986230, 710986613,
    710986954, 710987254, 711019618, 711019922, 711020438, 711021134, 711021842,
    711022291, 711022588, 711022895, 711023230, 711023556, 711024672, 711025157,
    711025450, 711025700, 711026007, 711026235, 711026463, 711027024, 711027378,
    711027584, 711028395, 711028659, 711028936, 711029243, 711029784, 711030180,
    711030563, 711030883, 711031220, 711031520, 711035674, 711035936, 711036728,
    711037031, 711037327, 711037611, 711037966, 711038241, 711042325, 711042866,
    711043620, 711044164, 711044425, 711044909, 711045515, 711046155, 711046764,
    711047276, 711047673, 711048254, 711049382, 711050401, 711050770, 711051186,
    711051591, 711052204, 711052655, 711053236, 711053393, 711053780, 711053973,
    711054286, 711054578, 711054809, 711055189, 711055389, 711055737, 711056067,
    711056468,
  ];
}

const client = new algosdk.Algodv2("", node_api, "");
const indexer = new algosdk.Indexer("", indexer_api, "");
let palette = [
  "#400000",
  "#400000",
  "#400900",
  "#234000",
  "#004000",
  "#004000",
  "#004000",
  "#000d40",
  "#000040",
  "#000040",
  "#000040",
  "#000040",
  "#280040",
  "#400003",
  "#400000",
  "#000000",
  "#540000",
  "#540000",
  "#541d00",
  "#375400",
  "#005400",
  "#005400",
  "#005402",
  "#002154",
  "#000054",
  "#000054",
  "#000054",
  "#000054",
  "#3c0054",
  "#540017",
  "#540000",
  "#0d0d0d",
  "#680000",
  "#680000",
  "#683100",
  "#4b6800",
  "#006800",
  "#006800",
  "#006816",
  "#003568",
  "#001168",
  "#000068",
  "#000068",
  "#000068",
  "#500068",
  "#68002b",
  "#680000",
  "#212121",
  "#7c0000",
  "#7c0000",
  "#7c4500",
  "#5f7c00",
  "#0b7c00",
  "#007c00",
  "#007c2a",
  "#00497c",
  "#00257c",
  "#00007c",
  "#00007c",
  "#10007c",
  "#64007c",
  "#7c003f",
  "#7c0000",
  "#353535",
  "#900000",
  "#900400",
  "#905900",
  "#739000",
  "#1f9000",
  "#009000",
  "#00903e",
  "#005d90",
  "#003990",
  "#000090",
  "#000090",
  "#240090",
  "#780090",
  "#900053",
  "#900000",
  "#494949",
  "#a40000",
  "#a41800",
  "#a46d00",
  "#87a400",
  "#33a400",
  "#00a400",
  "#00a452",
  "#0071a4",
  "#004da4",
  "#0000a4",
  "#0000a4",
  "#3800a4",
  "#8c00a4",
  "#a40067",
  "#a40013",
  "#5d5d5d",
  "#b80000",
  "#b82c00",
  "#b88100",
  "#9bb800",
  "#47b800",
  "#00b800",
  "#00b866",
  "#0085b8",
  "#0061b8",
  "#000db8",
  "#0000b8",
  "#4c00b8",
  "#a000b8",
  "#b8007b",
  "#b80027",
  "#717171",
  "#cc0000",
  "#cc4000",
  "#cc9500",
  "#afcc00",
  "#5bcc00",
  "#06cc00",
  "#00cc7a",
  "#0099cc",
  "#0075cc",
  "#0021cc",
  "#0c00cc",
  "#6000cc",
  "#b400cc",
  "#cc008f",
  "#cc003b",
  "#858585",
  "#e00000",
  "#e05400",
  "#e0a900",
  "#c3e000",
  "#6fe000",
  "#1ae000",
  "#00e08e",
  "#00ade0",
  "#0089e0",
  "#0035e0",
  "#2000e0",
  "#7400e0",
  "#c800e0",
  "#e000a3",
  "#e0004f",
  "#999999",
  "#f41414",
  "#f46814",
  "#f4bd14",
  "#d7f414",
  "#83f414",
  "#2ef414",
  "#14f4a2",
  "#14c1f4",
  "#149df4",
  "#1449f4",
  "#3414f4",
  "#8814f4",
  "#dc14f4",
  "#f414b7",
  "#f41463",
  "#adadad",
  "#ff2828",
  "#ff7c28",
  "#ffd128",
  "#ebff28",
  "#97ff28",
  "#42ff28",
  "#28ffb6",
  "#28d5ff",
  "#28b1ff",
  "#285dff",
  "#4828ff",
  "#9c28ff",
  "#f028ff",
  "#ff28cb",
  "#ff2877",
  "#c1c1c1",
  "#ff3c3c",
  "#ff903c",
  "#ffe53c",
  "#ffff3c",
  "#abff3c",
  "#56ff3c",
  "#3cffca",
  "#3ce9ff",
  "#3cc5ff",
  "#3c71ff",
  "#5c3cff",
  "#b03cff",
  "#ff3cff",
  "#ff3cdf",
  "#ff3c8b",
  "#d5d5d5",
  "#ff5050",
  "#ffa450",
  "#fff950",
  "#ffff50",
  "#bfff50",
  "#6aff50",
  "#50ffde",
  "#50fdff",
  "#50d9ff",
  "#5085ff",
  "#7050ff",
  "#c450ff",
  "#ff50ff",
  "#ff50f3",
  "#ff509f",
  "#e9e9e9",
  "#ff6464",
  "#ffb864",
  "#ffff64",
  "#ffff64",
  "#d3ff64",
  "#7eff64",
  "#64fff2",
  "#64ffff",
  "#64edff",
  "#6499ff",
  "#8464ff",
  "#d864ff",
  "#ff64ff",
  "#ff64ff",
  "#ff64b3",
  "#fdfdfd",
  "#ff7878",
  "#ffcc78",
  "#ffff78",
  "#ffff78",
  "#e7ff78",
  "#92ff78",
  "#78ffff",
  "#78ffff",
  "#78ffff",
  "#78adff",
  "#9878ff",
  "#ec78ff",
  "#ff78ff",
  "#ff78ff",
  "#ff78c7",
  "#ffffff",
  "#ff8c8c",
  "#ffe08c",
  "#ffff8c",
  "#ffff8c",
  "#fbff8c",
  "#a6ff8c",
  "#8cffff",
  "#8cffff",
  "#8cffff",
  "#8cc1ff",
  "#ac8cff",
  "#ff8cff",
  "#ff8cff",
  "#ff8cff",
  "#ff8cdb",
  "#ffffff",
];
const picker = new EightBitColorPicker({ el: "color-target", color: 15 });
const ManageHistory = (color, array) => {
  if (array.length === 4) {
    array.pop();
  }
  if (colorHistory.indexOf(color) >= 0) return;
  colorHistory = [color, ...colorHistory];
};

const pickerBtn = document.querySelector(".ebcp-selection");

picker.addEventListener("colorChange", function (e) {
  defaultNewBgValue = e.detail.picker.getHexColor();
  colorPicker.style.background = e.detail.picker.getHexColor();
  while (historyContainer.hasChildNodes()) {
    historyContainer.removeChild(historyContainer.firstChild);
  }
  ManageHistory(e.detail.picker.getHexColor(), colorHistory);
  colorHistory.forEach((color, i) => {
    const historyBox = document.createElement("div");
    historyBox.classList.add("history-box");
    if (i === 0) {
      historyBox.style.borderRadius = "5px 5px 0 0";
    }

    if (i == 3) {
      historyBox.style.borderRadius = "0 0 5px 5px";
    }
    historyBox.addEventListener("click", () => {
      defaultNewBgValue = historyBox.style.backgroundColor;
      colorPicker.style.background = historyBox.style.backgroundColor;
      pickerBtn.style.background = historyBox.style.backgroundColor;
    });
    historyBox.style.backgroundColor = color;
    historyContainer.appendChild(historyBox);
  });
});
let boxBaseValue = 0;
let Boxes = Array.from(Array(128), () => new Array(1));
const instance = axios.create({
  baseURL: "https://api.algopixels.site",
});

function rgbToHex(color) {
  color = "" + color;
  if (!color || color.indexOf("rgb") < 0) {
    return;
  }

  if (color.charAt(0) == "#") {
    return color;
  }

  var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
    r = parseInt(nums[2], 10).toString(16),
    g = parseInt(nums[3], 10).toString(16),
    b = parseInt(nums[4], 10).toString(16);

  return (
    "#" +
    ((r.length == 1 ? "0" + r : r) +
      (g.length == 1 ? "0" + g : g) +
      (b.length == 1 ? "0" + b : b))
  );
}

async function Execute() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    events.initial = "touchstart";
    events.drag = "touchmove";
    events.terminate = "touchend";
  } else {
    events.initial = "mousedown";
    events.drag = "mouseenter";
    events.terminate = "mouseup";
  }

  try {
    const server = await instance.get("/pixels", {
      params: {
        chain: "testnet",
      },
    });
    let boxNumber = boxBaseValue;
    let rowPixelCount = 0;
    let pixelCount = 0;

    server.data.forEach((data, i) => {
      if (pixelCount === 8) {
        pixelCount = 0;
        boxNumber++;
      }
      if (rowPixelCount === 128) {
        boxNumber = boxBaseValue;
        pixelCount = 0;
        rowPixelCount = 0;
      }
      switch (i) {
        case 1024:
          boxBaseValue = 16;
          boxNumber = boxBaseValue;
          break;
        case 2048:
          boxBaseValue = 32;
          boxNumber = boxBaseValue;
          break;
        case 3072:
          boxBaseValue = 48;
          boxNumber = boxBaseValue;
          break;
        case 4096:
          boxBaseValue = 64;
          boxNumber = boxBaseValue;
          break;
        case 5120:
          boxBaseValue = 80;
          boxNumber = boxBaseValue;
          break;
        case 6144:
          boxBaseValue = 96;
          boxNumber = boxBaseValue;
          break;
        case 7168:
          boxBaseValue = 112;
          boxNumber = boxBaseValue;
          break;
        default:
      }
      rowPixelCount++;
      pixelCount++;
      Boxes[boxNumber][i] = data;
    });
    boxBaseValue = 0;
  } catch (error) {
    console.log(error);
  }
}

const Execution = () => {
  Boxes.forEach((Box, i) => {
    let parentDiv = document.createElement("div");
    const mainParentDiv = document.querySelector("#mainParent");
    parentDiv.classList.add("grid-div");
    mainParentDiv.classList.add("parent-bg");
    parentDiv.id = `${i}`;
    if (i === 127) {
      parentDiv.classList.add("grid-disabled");
    }
    parentDiv.innerText = "";
    mainParentDiv.appendChild(parentDiv);
    Box.forEach((el) => {
      let childDiv = document.createElement("div");
      childDiv.style.background = el;
      parentDiv.appendChild(childDiv);
    });

    parentDiv.addEventListener("click", async () => {
      let pixelNumber = document.querySelector("#slot-number");
      let colorDetail = document.querySelector("#old-color");
      body.style.overflow = "auto";
      const selectedGridContainer = document.querySelector(
        "#selected-container"
      );

      selectedGridContainer.classList.remove("selected-grid-container-hidden");
      selectedGridContainer.classList.add("selected-grid-container");
      const selectedGrid = document.querySelector(".selected-grid");
      while (selectedGrid.hasChildNodes()) {
        selectedGrid.removeChild(selectedGrid.firstChild);
      }
      selectedGrid.id = parentDiv.id;
      const owner = await get_owner(nft_ids[selectedGrid.id]);
      pixelNumber.innerText = `Pixel Slot #${selectedGrid.id}`;
      colorDetail.innerText = `${
        owner[0] +
        owner[1] +
        owner[2] +
        "..." +
        owner[55] +
        owner[56] +
        owner[57]
      }`;
      colorDetail.href = `${explorer_basepoint}address/${owner}`;
      Boxes[parentDiv.id].forEach((data, i) => {
        let selectedGridElements = document.createElement("div");
        selectedGridElements.style.background = data;
        selectedGridElements.classList.add("pixels");
        selectedGridElements.id = `target${i}`;
        selectedGridElements.innerText = "";
        selectedGrid.appendChild(selectedGridElements);
      });
      selectedGrid.scrollIntoView({ behavior: "smooth" });
      AlgoGems.href = `https://algogems.io/nft/${nft_ids[selectedGrid.id]}`;
      nftExplorer.href = `https://www.nftexplorer.app/asset/${
        nft_ids[selectedGrid.id]
      }`;
      selectedGrid.addEventListener(events.initial, () => {
        body.style.overflow = "hidden";
        selectedGrid.childNodes.forEach((child) => {
          child.addEventListener(events.initial, changePixel, true);
          child.addEventListener(events.drag, changePixel, true);
        });
        document.addEventListener(events.terminate, () => {
          selectedGrid.childNodes.forEach((child) => {
            body.style.overflow = "auto";
            child.removeEventListener(events.drag, changePixel, true);
          });
        });
      });
      selectedGrid.childNodes.forEach((child) => {
        child.addEventListener(events.initial, changePixel, true);
      });
    });
  });
  const loaderDiv = document.querySelector(".loading-con");
  loaderDiv.classList.add("loading-con-disabled");
  document.querySelector(".MyAlgo").classList.remove("MyAlgohidden");
  const connectBtn = document.querySelector(".MyAlgo");
  connectBtn.classList.remove("MyAlgoHidden");
  document.querySelector(".banner-img").classList.remove("hidden");
  connectBtn.addEventListener("click", async () => {
    if (!connected) {
      await connectMyAlgo();
      const toolTip = document.createElement("span");
      toolTip.innerText = "Disconnect";
      toolTip.classList.add("tooltiptext");
      connectBtn.appendChild(toolTip);
    } else {
      connected = false;
      userAddress = "";
      connectBtn.innerText = "Connect to MyAlgo";
      localStorage.clear("address");
    }
  });
  document.querySelector(".EditState").addEventListener("click", () => {
    if (connected) {
      const selectedGrid = document.querySelector(".selected-grid");
      let colorIds = [];
      selectedGrid.childNodes.forEach((pixel, i) => {
        let color = rgbToHex(pixel.style.backgroundColor);
        colorIds = [...colorIds, palette.findIndex((col) => col === color)];
      });
      const int8array = new Uint8Array([...colorIds]);
      InitiateTransaction(selectedGrid.id, int8array);
    } else {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        positionClass: "toast-bottom-left",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr["error"]("Please connect your algo wallet");
    }
  });
};
Execute().then(() => {
  setTimeout(() => {
    Execution();
    setInterval(async () => {
      try {
        const updatedResponse = await instance.get("/changed", {
          params: {
            chain: chain,
          },
        });
        if (updatedResponse.data.length > 0) {
          updatedResponse.data.forEach((result) => {
            updateBox(result.boxNumber, result.colors);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }, 30000);
  }, 3000);
});

const changePixel = (e) => {
  if (e.touches) {
    const el = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (el.id.includes("target")) {
      el.style.background = defaultNewBgValue;
    }
  }
  e.target.style.background = defaultNewBgValue;
};

async function is_owner(address, asa_id) {
  const accountInfo = await indexer.lookupAccountByID(address).do();
  const assetsOwned = accountInfo.account.assets;

  let i = 0;
  while (i < assetsOwned.length) {
    if (assetsOwned[i]["asset-id"] == asa_id && assetsOwned[i]["amount"] == 1) {
      return true;
    }
    i += 1;
  }

  return false;
}

const InitiateTransaction = async (boxId, colorIds) => {
  try {
    const res = await is_owner(userAddress, nft_ids[boxId]);
    if (!res) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        positionClass: "toast-bottom-left",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr["error"](`Pixel Slot #${boxId} not owned`);
    } else {
      put_data(boxId, colorIds);
    }
  } catch (error) {
    console.log(error);
  }
};
async function get_owner(asa_id) {
  let owner = "";
  let owners = await indexer.lookupAssetBalances(asa_id).do();

  while (true) {
    next_token = owners["next-token"];
    owners = owners["balances"];

    if (owners.length == 0) {
      break;
    }

    owners.forEach((element) => {
      if (element["amount"] == 1) {
        owner = element["address"];
      }
    });

    if (owner != "") {
      break;
    }
    owners = await indexer
      .lookupAssetBalances(asa_id)
      .nextToken(next_token)
      .do();
  }

  if (owner == "") {
    throw new Error("Owner not found");
  } else {
    return owner;
  }
}

async function renderBox(boxNumber) {
  const number = parseInt(boxNumber);
  const res = await instance.get("/square", {
    params: {
      number: number,
      chain: chain,
    },
  });
  updateBox(boxNumber, res.data);
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const updateBox = (boxNumber, colors) => {
  const newArr = Boxes[boxNumber].filter((a) => a);
  const isEqual = arrayEquals(newArr, colors);
  // Do nothing
  if (isEqual) return;
  Boxes[boxNumber] = colors;
  const selectedBox = document.getElementById(`${boxNumber}`);
  while (selectedBox.hasChildNodes()) {
    selectedBox.removeChild(selectedBox.firstChild);
  }
  colors.forEach((el, i) => {
    let childDiv = document.createElement("div");
    childDiv.style.background = el;
    childDiv.classList.add("animate");
    selectedBox.appendChild(childDiv);
  });
  setTimeout(() => {
    selectedBox.childNodes.forEach((child) => {
      child.classList.remove("animate");
    });
  }, 500);
};

async function put_data(block_number, indexes) {
  const nft_id = nft_ids[block_number];
  const params = await client.getTransactionParams().do();
  const param = Uint8Array.from("put_block", (c) => c.charCodeAt(0));

  const txn = await algosdk.makeApplicationNoOpTxnFromObject({
    suggestedParams: {
      ...params,
    },
    from: userAddress,
    foreignAssets: [nft_id],
    appArgs: [param, Uint8Array.from([block_number]), indexes],
    appIndex: app_id,
  });

  const myAlgoConnect = await new MyAlgoConnect();
  const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

  try {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      positionClass: "toast-bottom-left",
      preventDuplicates: false,
      onclick: null,
      progressBar: true,
      showDuration: "0",
      hideDuration: "0",
      timeOut: "12000",
      extendedTimeOut: "0",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr["info"]("Please Wait");
    await client.sendRawTransaction(signedTxn.blob).do();
    const pendingInfoTxn = await algosdk.waitForConfirmation(
      client,
      signedTxn.txID,
      10
    );
    if (pendingInfoTxn) {
      toastr.clear();
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        positionClass: "toast-bottom-left",
        preventDuplicates: false,
        onclick: null,
        showDuration: "0",
        hideDuration: "0",
        timeOut: "3000",
        extendedTimeOut: "0",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr["success"]("State succesfully edited");
      setTimeout(() => {
        renderBox(block_number);
      }, 2000);
    }
  } catch (err) {
    const error = err.message;
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      positionClass: "toast-bottom-left",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr["error"](`${error}`);
    return;
  }
}
const connectMyAlgo = async () => {
  try {
    const myAlgoWallet = await new MyAlgoConnect();
    const accounts = await myAlgoWallet.connect({
      shouldSelectOneAccount: true,
    });
    userAddress = accounts[0].address;
    document.querySelector(".MyAlgo").innerText =
      userAddress[0] +
      userAddress[1] +
      userAddress[2] +
      userAddress[3] +
      "..." +
      userAddress[54] +
      userAddress[55] +
      userAddress[56] +
      userAddress[57];
    localStorage.setItem("address", JSON.stringify(userAddress));
    connected = true;
  } catch (err) {
    console.error(err);
  }
};
