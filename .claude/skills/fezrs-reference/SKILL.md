---
name: fezrs-reference
description: Facts about the FEZrs Python package (API, modules, install, paper claims) and correct one-line definitions of remote-sensing terms. Use when writing or checking any FEZrs or remote-sensing content on the site.
---

# FEZrs reference

The sources of truth are, in this order:
1. Paper: https://github.com/FEZtool-team/FEZrs/blob/main/paper/paper.md (JOSS submission, under review)
2. Docs: https://feztool-team.github.io/FEZdocs/libraries/fezrs/
3. Code: https://github.com/FEZtool-team/FEZrs

If this file disagrees with those sources, they win: update this file.

## What it is

"An open-source Python package for geospatial multispectral image processing and remote sensing." License Apache-2.0. Released on PyPI in February 2025. Built on NumPy, Rasterio, GDAL, OpenCV, scikit-image, scikit-learn, matplotlib, pandas and GeoPandas.

## Install

```bash
pip install fezrs
conda install -c FEZtool fezrs
mamba install FEZtool::fezrs
```

## Calculator API

Every operation is a `…Calculator` class that inherits `BaseTool`, and every one is used the same way:

```python
from fezrs import NDVICalculator

ndvi = NDVICalculator(nir_path="B5.tif", red_path="B4.tif")
ndvi.execute(output_path="./outputs")              # figure (PNG via matplotlib)
ndvi.to_raster(output_path="./outputs/ndvi.tif")   # georeferenced GeoTIFF
```

- Constructor arguments are band paths named after the band (`nir_path`, `red_path`, `tif_path`, …). Check the docs for each calculator.
- `execute()` validates, processes and saves a figure. It is a picture of the result, quantized and without CRS.
- `to_raster()` writes the full-precision array with the source CRS and affine transform. It reads the computed result, so call `execute()` (or `process()`) first.
- Other methods include `histogram_export`.

## Modules (paper, Table 1): 37 calculators

| Change Detection | Filters | Image Enhancement | Spectral Indices | Additional Tools |
|---|---|---|---|---|
| Burn, Indices, MagDir, SubDiv, Time | Gaussian, Laplacian, Mean, Median, Sobel | Original, Float, Equalize, Adaptive, Gamma, LogAdjust, SigmoidAdjust, OriginalRGB, EqualizeRGB, AdaptiveRGB, GammaRGB | AFRI, BI, NDVI, NDWI, SAVI, UI | KMeans, GLCM, HSV, IRHSV, Mosaic, PCA, SpectralProfile, SVM |

That makes 35. The two satellite-specific calculators, `Landsat8Calculator` and `GeoeyeCalculator`, bring it to 37.

## Claims that are safe to publish

- More than 100,000 downloads (PePy). The paper notes this may include mirror traffic. Write "100k+".
- 37 operations behind one three-line calling pattern.
- Available on GitHub, PyPI and Anaconda.
- Merit Award (Ideator category), 9th Iran National Young Scientists Festival.
- Published applications, all by members of the FEZrs team:
  - PCA of Landsat 9 imagery (8th Symposium of the Sedimentological Society of Iran, 2024)
  - K-means vs. spectral indices for LULC on Landsat 8 (2nd Int. Conf. for Iranian Geography and Earth Sciences Students, 2024)
  - SVM, K-means and spectral indices for land cover in engineering geology (Kharazmi Journal of Earth Sciences 11(1), 2025, doi:10.22034/KJES.2025.11.1.103081)
- Field use: geospatial analysis of the Torud Playa area, Isfahan, Iran.
- 10 paper co-authors. The site does not list their names.

Do not claim: a JOSS acceptance (it is under review), user counts, institutional adoption, or features not in the module table.

## Vocabulary (one line each)

- **Multispectral image**: an image recorded in several wavelength bands (for example blue, green, red, near-infrared).
- **Band**: one wavelength range of a multispectral image, stored as a single raster layer.
- **Reflectance**: the fraction of incoming light a surface reflects; spectral indices assume reflectance, not raw digital numbers.
- **NDVI**: (NIR − Red) / (NIR + Red); higher values indicate denser green vegetation.
- **NDWI** (McFeeters): (Green − NIR) / (Green + NIR); positive values indicate open water.
- **SAVI**: an NDVI variant with a soil-brightness correction factor L (often 0.5), for sparse vegetation.
- **AFRI**: aerosol-free vegetation index, which uses shortwave infrared instead of red to reduce aerosol effects.
- **BI / BSI**: bare-soil index, which highlights exposed soil by combining SWIR, red, NIR and blue.
- **UI**: Urban Index, (SWIR2 − NIR) / (SWIR2 + NIR); higher values indicate built-up land.
- **Gaussian filter**: smoothing with a Gaussian kernel to suppress noise.
- **Median filter**: replaces each pixel with its neighbourhood median, removing speckle while keeping edges.
- **Mean filter**: neighbourhood averaging (low-pass smoothing).
- **Laplacian**: a second-derivative operator that highlights rapid intensity changes (edges).
- **Sobel**: a first-derivative gradient operator for edge detection.
- **Histogram equalization / adaptive equalization (CLAHE)**: contrast enhancement that spreads intensity values globally or locally.
- **Gamma / log / sigmoid adjustment**: non-linear intensity transforms that brighten or compress tonal ranges.
- **HSV**: hue–saturation–value color space, which separates color from brightness.
- **GLCM**: gray-level co-occurrence matrix, a texture statistic built from pixel-pair frequencies.
- **PCA**: principal component analysis, which rotates bands into uncorrelated components ordered by variance.
- **K-Means**: unsupervised clustering of pixels into k spectral classes.
- **SVM**: support vector machine, a supervised classifier trained on labelled samples.
- **Spectral profile**: reflectance plotted against wavelength for a pixel or region.
- **Mosaic**: merging adjacent rasters into one continuous image.
- **Change detection**: comparing images of the same area at different dates to find change.
- **GeoTIFF**: a TIFF raster with embedded georeferencing (CRS and transform).
- **CRS**: coordinate reference system.

## Images on the site

`assets/img/fezrs/*.webp` are downscaled copies of `example/outputs/**` and `paper/figures/*` from the FEZrs repo (Apache-2.0).

- Outputs are **cropped to their content box before resizing** (filters: 100px margin on 7899×7900; HSV: 100px on 4050²; K-Means: 50px on 5875²). The originals have different white margins, so uncropped versions do not line up in the compare slider. Cropped this way, HSV and K-Means register exactly, and so do all five filters.
- `ndvi.webp` / `ndwi.webp` are the image areas of figure 2's panels (c) and (d), without axes or colorbars (used in the hero animation). The full paper figures are not shown on the site.
- PCA outputs are deliberately not used: the multi-panel figure is not legible at web size.
- To refresh: download the originals, flatten onto white, crop, resize to 1200px, and save as WebP at quality 82.
