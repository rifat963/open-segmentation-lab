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
