## Icaros MajorGeeks 縮圖修復筆記

**目的** 透過 Icaros Shell Extension 啟用 Windows 檔案總管針對 HEVC (H.265)、MKV 與 MP4 格式之縮圖預覽功能，無須安裝 Microsoft Store 付費解碼器。

**操作步驟**

1. **下載 (Download)** 從 MajorGeeks 或 VideoHelp 等信任來源下載 **Icaros** 最新版本（建議 v3.3.x 以上）。
    
2. **執行 (Launch)** 以「系統管理員身分」執行 `IcarosConfig.exe`。
    
3. **設定 (Configuration)**
    
    - 切換至 **THUMBNAILING** 分頁。
        
    - 檢查 **Thumbnail filetypes** 欄位是否包含目標副檔名（如 `.hevc`、`.mp4`、`.mkv`）。若未包含，請手動輸入並以分號區隔。
        
    - 點擊 **[ACTIVATE]** 按鈕註冊系統 Shell Extension。確認狀態顯示為 "Active"。
        
4. **驗證 (Verification)** 於 Windows 檔案總管開啟影片所在目錄。按下 `F5` 重新整理，確認縮圖是否正確生成。
    
5. **完成 (Completion)** 關閉 Icaros 設定視窗。本程式僅作註冊用途，無須常駐背景即可運作。