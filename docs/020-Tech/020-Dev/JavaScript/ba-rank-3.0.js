import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function BACalculator() {
  // 1. 設定狀態 (對應 st.session_state)
  const [rank, setRank] = useState(66); // 預設值 66

  // 2. 計算邏輯 (對應 Python: int(input_val * 0.7 // 1))
  const result = Math.floor(rank * 0.7);

  // 3. 產生按鈕列表的邏輯
  const renderButtons = () => {
    let buttons = [];
    // Python邏輯: range(max(result - 2, 0), input_val + 1)
    const start = Math.max(result - 2, 1); // 排名通常從1開始，所以設1比較保險
    const end = rank; 

    for (let r = start; r < end; r++) {
      // 對應 Python: if rank == input_val continue (這裡迴圈條件 r < end 已經排除了)
      const rankResult = Math.floor(r * 0.7);
      
      buttons.push(
        <button
          key={r}
          onClick={() => setRank(r)} // 點擊後更新排名 (set_value_from_button)
          style={{
            margin: '5px',
            padding: '8px 16px',
            backgroundColor: '#f0f2f5',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#333'
          }}
        >
          目標 {r} → {rankResult}
        </button>
      );
    }
    return buttons;
  };

  return (
    <Layout title="0.7 計算機" description="蔚藍檔案 PVP 計算機">
      {/* 背景圖容器 */}
      <div style={{
        backgroundImage: 'url(/img/28.png)', // 指向 static/img/28.png
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 60px)', // 扣掉導覽列高度
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        
        {/* 主要區塊 (main-block) */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // 半透明白底，讓字看清楚
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center'
        }}>
          
          <h1 style={{ color: '#333', marginBottom: '30px' }}>0.7 計算機</h1>

          {/* 輸入框 */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '10px' }}>
              請輸入目前排名
            </label>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              style={{
                fontSize: '1.5em',
                padding: '10px',
                width: '150px',
                textAlign: 'center',
                borderRadius: '8px',
                border: '2px solid #1890ff'
              }}
            />
          </div>

          {/* 計算結果 */}
          <div style={{ margin: '30px 0', fontSize: '1.5em', color: '#333' }}>
            計算結果： <span style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '1.8em' }}>{result}</span>
          </div>

          <div style={{ textAlign: 'left', marginTop: '30px' }}>
            <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#555' }}>
              5票10名至少68內：68→47→32→22→15→10
            </h3>
            
            {/* 按鈕生成區 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '15px' }}>
              {renderButtons()}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}