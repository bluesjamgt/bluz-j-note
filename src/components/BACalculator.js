import React, { useState } from 'react';

export default function BACalculator() {
  const [rank, setRank] = useState(66);
  const result = Math.floor(rank * 0.7);

  const renderButtons = () => {
    let buttons = [];
    const start = Math.max(result - 2, 1);
    const end = rank; 

    for (let r = start; r < end; r++) {
      const rankResult = Math.floor(r * 0.7);
      buttons.push(
        <button
          key={r}
          onClick={() => setRank(r)}
          style={{
            margin: '5px',
            padding: '5px 10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#333',
            fontWeight: 'bold',
            flex: '1 0 40%' // 讓按鈕整齊排列
          }}
        >
          {r} → {rankResult}
        </button>
      );
    }
    return buttons;
  };

  return (
    // === 最外層容器 (固定尺寸區) ===
    <div style={{
      // 1. 鎖定尺寸 (這裡就是你要的設定)
      width: '720px',
      height: '1440px',
      
      // 2. RWD 安全鎖 (如果螢幕比 720px 小，就自動縮放，不然手機會破版)
      maxWidth: '100%', 
      
      // 3. 讓整個容器在 Wiki 頁面中置中
      margin: '0 auto',
      
      // 4. 背景設定
      backgroundImage: 'url(/img/28.png)', 
      backgroundSize: 'cover', // 讓圖片填滿整個 720x1440
      backgroundPosition: 'center',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      
      // 5. 內部排版 (讓操作卡片垂直置中，看起比較像遊戲 UI)
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // 如果想靠上對齊，改成 'flex-start' 並加 padding
      alignItems: 'center',
      overflow: 'hidden' // 防止內部東西跑出來
    }}>
      
      {/* === 操作面板卡片 === */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // 90% 不透明白底
        padding: '30px',
        borderRadius: '16px',
        width: '90%', // 卡片寬度佔容器的 90%
        maxWidth: '600px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1890ff', fontSize: '1.8em' }}>BA PVP RANK</h2>
        
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
            目前排名
          </label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(Number(e.target.value))}
            style={{ 
              padding: '10px', 
              width: '80%', 
              textAlign: 'center', 
              fontSize: '1.5em',
              borderRadius: '8px',
              border: '2px solid #1890ff',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ fontSize: '1.4em', margin: '20px 0', padding: '15px', background: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
          目標排名：<span style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '1.5em' }}>{result}</span>
        </div>

        <hr style={{ margin: '25px 0', borderTop: '1px solid #eee' }} />
        
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>▼ 預估名次：</p>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            maxHeight: '300px', // 如果按鈕太多，限制高度
            overflowY: 'auto'   // 超過就捲動，不影響外框
          }}>
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}