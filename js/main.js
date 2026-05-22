(function () {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        body.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelectorAll("[data-code-tabs]").forEach(function (tabSet) {
    const tabs = Array.from(tabSet.querySelectorAll("[data-tab-target]"));
    const panels = Array.from(tabSet.querySelectorAll(".code-panel"));

    function activateTab(tab) {
      const targetId = tab.getAttribute("data-tab-target");
      tabs.forEach(function (item) {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach(function (panel) {
        const isActive = panel.id === targetId;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activateTab(tab);
      });

      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + direction + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });
  });

  const simulatorCanvas = document.getElementById("task-simulator-canvas");
  if (simulatorCanvas) {
    const ctx = simulatorCanvas.getContext("2d");
    const simControls = {
      taskRadios: document.querySelectorAll('input[name="sim-task"]'),
      scene: document.getElementById("sim-scene"),
      uncertainty: document.getElementById("sim-uncertainty"),
      uncertaintyValue: document.getElementById("sim-uncertainty-value"),
      showImage: document.getElementById("sim-show-image"),
      showMask: document.getElementById("sim-show-mask"),
      showBoundaries: document.getElementById("sim-show-boundaries"),
      showLabels: document.getElementById("sim-show-labels"),
      resample: document.getElementById("sim-resample"),
      caption: document.getElementById("simulator-caption"),
      summary: document.getElementById("simulator-summary"),
      legend: document.getElementById("simulator-legend")
    };

    const simState = {
      task: "semantic",
      scene: "street",
      uncertainty: 18,
      seed: 9
    };

    const classColors = {
      sky: "#9dc3ff",
      road: "#9aa6b2",
      sidewalk: "#d9e2ec",
      building: "#c9d6e2",
      car: "#f9c66d",
      person: "#2f8f8a",
      crop: "#76b66f",
      soil: "#c79a62",
      disease: "#d96b5f",
      leaf: "#3e9f68",
      background: "#edf4fa",
      cell: "#b990d4",
      nucleus: "#6b78d6"
    };

    const instanceColors = ["#f9c66d", "#2f8f8a", "#9dc3ff", "#d96b5f", "#8c75c8", "#4b9fdf"];

    const scenes = {
      street: {
        label: "Urban street scene",
        stuff: [
          { label: "sky", shape: "rect", className: "sky", x: 0, y: 0, w: 960, h: 190 },
          { label: "building", shape: "rect", className: "building", x: 60, y: 80, w: 220, h: 170 },
          { label: "sidewalk", shape: "rect", className: "sidewalk", x: 0, y: 250, w: 960, h: 90 },
          { label: "road", shape: "polygon", className: "road", points: [[0, 340], [960, 300], [960, 560], [0, 560]] }
        ],
        things: [
          { label: "car 1", className: "car", shape: "car", x: 510, y: 318, w: 210, h: 92 },
          { label: "car 2", className: "car", shape: "car", x: 250, y: 356, w: 150, h: 68 },
          { label: "person 1", className: "person", shape: "person", x: 760, y: 245, w: 56, h: 150 },
          { label: "person 2", className: "person", shape: "person", x: 418, y: 260, w: 48, h: 132 }
        ]
      },
      clinic: {
        label: "Microscopy cell field",
        stuff: [
          { label: "background", shape: "rect", className: "background", x: 0, y: 0, w: 960, h: 560 }
        ],
        things: [
          { label: "cell 1", className: "cell", shape: "cell", x: 150, y: 120, w: 150, h: 112 },
          { label: "cell 2", className: "cell", shape: "cell", x: 415, y: 90, w: 165, h: 135 },
          { label: "cell 3", className: "cell", shape: "cell", x: 660, y: 250, w: 175, h: 126 },
          { label: "cell 4", className: "cell", shape: "cell", x: 270, y: 330, w: 150, h: 118 }
        ]
      },
      agriculture: {
        label: "Agricultural field",
        stuff: [
          { label: "soil", shape: "rect", className: "soil", x: 0, y: 0, w: 960, h: 560 },
          { label: "crop row", shape: "polygon", className: "crop", points: [[80, 0], [210, 0], [340, 560], [160, 560]] },
          { label: "crop row", shape: "polygon", className: "crop", points: [[400, 0], [530, 0], [650, 560], [480, 560]] },
          { label: "crop row", shape: "polygon", className: "crop", points: [[710, 0], [820, 0], [940, 560], [810, 560]] }
        ],
        things: [
          { label: "leaf 1", className: "leaf", shape: "leaf", x: 178, y: 155, w: 130, h: 82 },
          { label: "leaf 2", className: "leaf", shape: "leaf", x: 490, y: 250, w: 150, h: 90 },
          { label: "disease 1", className: "disease", shape: "spot", x: 535, y: 278, w: 48, h: 34 },
          { label: "leaf 3", className: "leaf", shape: "leaf", x: 755, y: 118, w: 120, h: 78 }
        ]
      }
    };

    const taskCopy = {
      semantic: {
        caption: "Semantic mode uses one shared color for each class. Two cars or two cells become the same category, not separate identities.",
        summary: "<strong>Output:</strong> dense class map<br><strong>Good metrics:</strong> pixel accuracy, mIoU, Dice<br><strong>Classroom check:</strong> ask which pixels have the same class."
      },
      instance: {
        caption: "Instance mode gives every countable object its own mask. Stuff regions are context, but the task focuses on separate objects.",
        summary: "<strong>Output:</strong> one mask per object instance<br><strong>Good metrics:</strong> Mask AP and mask IoU<br><strong>Classroom check:</strong> count how many objects of the same class remain separate."
      },
      panoptic: {
        caption: "Panoptic mode combines stuff regions and thing instances into one complete scene map with no overlapping assignments.",
        summary: "<strong>Output:</strong> class label plus instance id where needed<br><strong>Good metric:</strong> Panoptic Quality<br><strong>Classroom check:</strong> verify every pixel belongs to exactly one segment."
      }
    };

    function jitter(value, scale) {
      const raw = Math.sin((value + simState.seed) * 12.9898) * 43758.5453;
      return (raw - Math.floor(raw) - 0.5) * scale;
    }

    function withAlpha(hex, alpha) {
      const clean = hex.replace("#", "");
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    }

    function addRoundRect(x, y, w, h, radius) {
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x, y, w, h, radius);
        return;
      }
      const r = Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2);
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
    }

    function drawPolygon(points, offset) {
      ctx.beginPath();
      points.forEach(function (point, index) {
        const x = point[0] + jitter(index + 1, offset);
        const y = point[1] + jitter(index + 8, offset);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
    }

    function drawShape(item, options) {
      const offset = options.offset || 0;
      const x = item.x + jitter(item.x, offset);
      const y = item.y + jitter(item.y, offset);
      const w = item.w + offset * 0.5;
      const h = item.h + offset * 0.5;

      if (item.shape === "polygon") {
        drawPolygon(item.points, offset);
        return;
      }

      if (item.shape === "car") {
        ctx.beginPath();
        addRoundRect(x, y + h * 0.22, w, h * 0.58, 12);
        addRoundRect(x + w * 0.18, y, w * 0.48, h * 0.36, 10);
        return;
      }

      if (item.shape === "person") {
        ctx.beginPath();
        ctx.ellipse(x + w * 0.5, y + h * 0.12, w * 0.22, h * 0.1, 0, 0, Math.PI * 2);
        addRoundRect(x + w * 0.29, y + h * 0.22, w * 0.42, h * 0.43, 12);
        addRoundRect(x + w * 0.2, y + h * 0.62, w * 0.22, h * 0.36, 8);
        addRoundRect(x + w * 0.58, y + h * 0.62, w * 0.22, h * 0.36, 8);
        return;
      }

      if (item.shape === "cell") {
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, jitter(item.x, 0.25), 0, Math.PI * 2);
        return;
      }

      if (item.shape === "leaf") {
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2.8, -0.35, 0, Math.PI * 2);
        return;
      }

      if (item.shape === "spot") {
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0.2, 0, Math.PI * 2);
        return;
      }

      ctx.beginPath();
      ctx.rect(x, y, w, h);
    }

    function fillShape(item, color, alpha, offset) {
      drawShape(item, { offset: offset });
      ctx.fillStyle = withAlpha(color, alpha);
      ctx.fill();
    }

    function strokeShape(item, color, offset) {
      drawShape(item, { offset: offset });
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 7]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawSourceScene(scene) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 560);
      gradient.addColorStop(0, "#f8fbff");
      gradient.addColorStop(1, "#edf4fa");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 960, 560);

      scene.stuff.forEach(function (region) {
        fillShape(region, classColors[region.className] || "#d9e2ec", 0.55, 0);
      });

      if (scene === scenes.clinic) {
        ctx.strokeStyle = "rgba(18, 58, 99, 0.08)";
        ctx.lineWidth = 1;
        for (let x = 0; x <= 960; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 560);
          ctx.stroke();
        }
        for (let y = 0; y <= 560; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(960, y);
          ctx.stroke();
        }
      }

      scene.things.forEach(function (thing, index) {
        const color = classColors[thing.className] || instanceColors[index % instanceColors.length];
        fillShape(thing, color, 0.78, 0);
      });
    }

    function textAt(text, x, y, fill) {
      ctx.font = "700 22px Segoe UI, Arial, sans-serif";
      ctx.textBaseline = "middle";
      const metrics = ctx.measureText(text);
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      ctx.beginPath();
      addRoundRect(x - 8, y - 18, metrics.width + 16, 36, 7);
      ctx.fill();
      ctx.fillStyle = fill || "#0b2744";
      ctx.fillText(text, x, y);
    }

    function centerOf(item) {
      if (item.shape === "polygon") {
        const total = item.points.reduce(function (acc, point) {
          return { x: acc.x + point[0], y: acc.y + point[1] };
        }, { x: 0, y: 0 });
        return { x: total.x / item.points.length, y: total.y / item.points.length };
      }
      return { x: item.x + item.w / 2, y: item.y + item.h / 2 };
    }

    function getLegendItems(scene, task) {
      const items = [];
      const seen = {};

      if (task === "semantic") {
        scene.stuff.concat(scene.things).forEach(function (item) {
          if (!seen[item.className]) {
            seen[item.className] = true;
            items.push({ label: item.className, color: classColors[item.className] || "#d9e2ec" });
          }
        });
      }

      if (task === "instance") {
        scene.things.forEach(function (item, index) {
          items.push({ label: item.label + " (" + item.className + ")", color: instanceColors[index % instanceColors.length] });
        });
      }

      if (task === "panoptic") {
        scene.stuff.forEach(function (item) {
          if (!seen[item.className]) {
            seen[item.className] = true;
            items.push({ label: "stuff: " + item.className, color: classColors[item.className] || "#d9e2ec" });
          }
        });
        scene.things.forEach(function (item, index) {
          items.push({ label: "thing: " + item.label, color: instanceColors[index % instanceColors.length] });
        });
      }

      return items;
    }

    function renderLegend(items) {
      if (!simControls.legend) {
        return;
      }
      simControls.legend.innerHTML = "";
      items.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "legend-item";
        const swatch = document.createElement("span");
        swatch.className = "legend-swatch";
        swatch.style.background = item.color;
        const label = document.createElement("span");
        label.textContent = item.label;
        row.appendChild(swatch);
        row.appendChild(label);
        simControls.legend.appendChild(row);
      });
    }

    function renderSimulator() {
      const scene = scenes[simState.scene];
      const uncertaintyOffset = simState.uncertainty * 0.7;
      const showImage = simControls.showImage && simControls.showImage.checked;
      const showMask = simControls.showMask && simControls.showMask.checked;
      const showBoundaries = simControls.showBoundaries && simControls.showBoundaries.checked;
      const showLabels = simControls.showLabels && simControls.showLabels.checked;

      ctx.clearRect(0, 0, 960, 560);
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, 960, 560);

      if (showImage) {
        drawSourceScene(scene);
      }

      if (showMask) {
        if (simState.task === "semantic") {
          scene.stuff.concat(scene.things).forEach(function (item) {
            fillShape(item, classColors[item.className] || "#d9e2ec", showImage ? 0.46 : 0.88, uncertaintyOffset);
          });
        }

        if (simState.task === "instance") {
          scene.things.forEach(function (item, index) {
            fillShape(item, instanceColors[index % instanceColors.length], showImage ? 0.54 : 0.9, uncertaintyOffset);
          });
        }

        if (simState.task === "panoptic") {
          scene.stuff.forEach(function (item) {
            fillShape(item, classColors[item.className] || "#d9e2ec", showImage ? 0.38 : 0.86, uncertaintyOffset);
          });
          scene.things.forEach(function (item, index) {
            fillShape(item, instanceColors[index % instanceColors.length], showImage ? 0.58 : 0.92, uncertaintyOffset);
          });
        }
      }

      if (showBoundaries) {
        const boundaryItems = simState.task === "instance" ? scene.things : scene.stuff.concat(scene.things);
        boundaryItems.forEach(function (item, index) {
          const color = simState.task === "instance" || simState.task === "panoptic"
            ? instanceColors[index % instanceColors.length]
            : "#0b2744";
          strokeShape(item, color, uncertaintyOffset);
        });
      }

      if (showLabels) {
        const labelItems = simState.task === "instance" ? scene.things : scene.stuff.concat(scene.things);
        labelItems.forEach(function (item, index) {
          const point = centerOf(item);
          const label = simState.task === "semantic" ? item.className : item.label;
          textAt(label, point.x - 28, point.y, simState.task === "semantic" ? "#0b2744" : instanceColors[index % instanceColors.length]);
        });
      }

      const legendItems = getLegendItems(scene, simState.task);
      renderLegend(legendItems);

      if (simControls.caption) {
        simControls.caption.textContent = taskCopy[simState.task].caption;
      }
      if (simControls.summary) {
        simControls.summary.innerHTML =
          taskCopy[simState.task].summary +
          "<br><strong>Current scene:</strong> " + scene.label +
          "<br><strong>Visible legend items:</strong> " + legendItems.length;
      }
      if (simControls.uncertaintyValue) {
        simControls.uncertaintyValue.textContent = simState.uncertainty + "%";
      }
    }

    simControls.taskRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (radio.checked) {
          simState.task = radio.value;
          renderSimulator();
        }
      });
    });

    if (simControls.scene) {
      simControls.scene.addEventListener("change", function () {
        simState.scene = simControls.scene.value;
        renderSimulator();
      });
    }

    if (simControls.uncertainty) {
      simControls.uncertainty.addEventListener("input", function () {
        simState.uncertainty = Number(simControls.uncertainty.value);
        renderSimulator();
      });
    }

    [simControls.showImage, simControls.showMask, simControls.showBoundaries, simControls.showLabels].forEach(function (control) {
      if (control) {
        control.addEventListener("change", renderSimulator);
      }
    });

    if (simControls.resample) {
      simControls.resample.addEventListener("click", function () {
        simState.seed += 11;
        renderSimulator();
      });
    }

    renderSimulator();
  }

  function readPositiveNumber(id) {
    const field = document.getElementById(id);
    if (!field) {
      return { value: NaN, valid: false };
    }
    const value = Number(field.value);
    return { value: value, valid: Number.isFinite(value) && value >= 0 };
  }

  function setResult(id, message, isError) {
    const result = document.getElementById(id);
    if (!result) {
      return;
    }
    result.textContent = message;
    result.classList.toggle("error", Boolean(isError));
  }

  const iouButton = document.getElementById("calculate-iou");
  if (iouButton) {
    iouButton.addEventListener("click", function () {
      const intersection = readPositiveNumber("iou-intersection");
      const union = readPositiveNumber("iou-union");
      if (!intersection.valid || !union.valid) {
        setResult("iou-result", "Enter non-negative numeric values.", true);
        return;
      }
      if (union.value <= 0) {
        setResult("iou-result", "Union must be greater than zero.", true);
        return;
      }
      if (intersection.value > union.value) {
        setResult("iou-result", "Intersection cannot be larger than union.", true);
        return;
      }
      const score = intersection.value / union.value;
      setResult("iou-result", "IoU = " + score.toFixed(4), false);
    });
  }

  const diceButton = document.getElementById("calculate-dice");
  if (diceButton) {
    diceButton.addEventListener("click", function () {
      const overlap = readPositiveNumber("dice-overlap");
      const predicted = readPositiveNumber("dice-predicted");
      const truth = readPositiveNumber("dice-ground-truth");
      if (!overlap.valid || !predicted.valid || !truth.valid) {
        setResult("dice-result", "Enter non-negative numeric values.", true);
        return;
      }
      const denominator = predicted.value + truth.value;
      if (denominator <= 0) {
        setResult("dice-result", "Predicted and ground-truth areas cannot both be zero.", true);
        return;
      }
      if (overlap.value > predicted.value || overlap.value > truth.value) {
        setResult("dice-result", "Overlap cannot exceed either mask area.", true);
        return;
      }
      const score = (2 * overlap.value) / denominator;
      setResult("dice-result", "Dice score = " + score.toFixed(4), false);
    });
  }

  const segmentationProfiles = {
    semantic: {
      definition: "Assigns one class label to every pixel in an image.",
      output: "A dense class map where pixels of the same category share one label.",
      models: "FCN, U-Net, DeepLabV3, SegFormer, Mask2Former.",
      metrics: "Pixel accuracy, mean IoU, Dice score."
    },
    instance: {
      definition: "Detects separate object instances and predicts a mask for each one.",
      output: "A set of object masks, each with a class label and confidence score.",
      models: "Mask R-CNN, YOLACT, YOLO segmentation models, SAM-assisted pipelines.",
      metrics: "Mask AP, IoU, AP at multiple IoU thresholds."
    },
    panoptic: {
      definition: "Combines semantic labels for stuff regions with instance masks for things.",
      output: "One coherent scene map where every pixel has a class and, when needed, an instance id.",
      models: "Panoptic FPN, DETR-style methods, Mask2Former.",
      metrics: "Panoptic Quality, Segmentation Quality, Recognition Quality."
    }
  };

  const selector = document.getElementById("segmentation-selector");
  const selectorOutput = document.getElementById("segmentation-selector-output");
  function renderSegmentationProfile(type) {
    if (!selectorOutput || !segmentationProfiles[type]) {
      return;
    }
    const profile = segmentationProfiles[type];
    selectorOutput.innerHTML =
      "<strong>Definition:</strong> " + profile.definition +
      "<br><strong>Output type:</strong> " + profile.output +
      "<br><strong>Example models:</strong> " + profile.models +
      "<br><strong>Suitable metrics:</strong> " + profile.metrics;
  }

  if (selector) {
    renderSegmentationProfile(selector.value);
    selector.addEventListener("change", function () {
      renderSegmentationProfile(selector.value);
    });
  }

  const maskCanvas = document.getElementById("mask-canvas");
  const showMask = document.getElementById("show-mask");
  const hideMask = document.getElementById("hide-mask");
  const toggleBoundary = document.getElementById("toggle-boundary");

  if (maskCanvas && showMask && hideMask && toggleBoundary) {
    showMask.addEventListener("click", function () {
      maskCanvas.classList.add("mask-visible");
    });
    hideMask.addEventListener("click", function () {
      maskCanvas.classList.remove("mask-visible");
    });
    toggleBoundary.addEventListener("click", function () {
      maskCanvas.classList.toggle("mask-boundary");
    });
  }
})();
