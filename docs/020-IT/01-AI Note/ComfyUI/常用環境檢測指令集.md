

> 適用時機： 安裝新插件前、ComfyUI 報錯時、或想確認核心版本是否跑掉時。 操作方式： 在 ComfyUI_windows_portable 資料夾路徑下開啟 CMD 執行。

## 1. 核心套件總檢閱

> 一次列出 Torch、SageAttention 與 Vision 等關鍵套件的版本與 CUDA 對應。

```bash
.\\\\python_embeded\\\\python.exe -m pip list | findstr "torch sageattention"
```

**✅ 範例 

- `sageattention` → `2.2.0+cu128torch2.8.0` (必須包含 torch2.8.0)
- `torch` → `2.8.0+cu128` (必須是 2.8.0)
- `torchaudio` → `2.8.0+cu128`
- `torchvision` → `0.23.0+cu128`

---

## 2. 硬體與驅動檢測 (NVIDIA 面板)

> 確認顯卡驅動版本是否足夠新 (向下相容原則)。

Bash

`nvidia-smi`

**✅ 判讀重點：**

- 看右上角 **`CUDA Version`**：數值需 **≥ 12.8** (例如 12.9 或 13.0 皆可)。
- 這是「系統驅動」的上限，只要比軟體需求 (cu128) 高就是綠燈。

---

## 3. 單一插件身家調查 (詳細資訊)

> 當你想知道某個插件到底是從哪裡裝的，或是看它的詳細依賴。

Bash

`.\\python_embeded\\python.exe -m pip show sageattention`

_(將 `sageattention` 換成任何你想查的套件名稱，如 `torch`)_

**✅ 判讀重點：**

- **Version**：確認完整版本號。
- **Location**：確認它是否裝在 `python_embeded\\Lib\\site-packages` 裡面 (避免誤用到系統 Python)。