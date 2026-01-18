class CoverFlow {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.coverflow = document.getElementById('coverflow');
        this.imageName = document.getElementById('imageName');
        this.imageCounter = document.getElementById('imageCounter');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.items = []; // Store DOM elements
        this.isAnimating = false;
        
        // Constants for 3D effect
        this.Z_DEPTH = 300; // Depth of side items
        this.X_OFFSET = 200; // Horizontal spacing of side items
        this.Y_ROTATION = 60; // Rotation angle
        
        this.init();
    }
    
    async init() {
        await this.loadImages();
        this.createItems(); // Create DOM elements once
        this.update(); // Initial position update
        this.setupEventListeners();
        this.updateInfo();
    }
    
    async loadImages() {
        const imageFiles = [
            '3D抽象オブジェクト.png',
            'ASCIIアート_マトリックス.png',
            'FUI_ヘッドアップディスプレイ.png',
            'Z型視線誘導.png',
            'アールデコ.png',
            'アイソメトリック.png',
            'アシッドグラフィックス.png',
            'エディトリアル_スタジオ.png',
            'オリガミ_ポリゴン.png',
            'ガラス_アンド_ウォーター.png',
            'キネティック_タイポグラフィ.png',
            'クリエイティブ_洗練.png',
            'クレイモーフィズム.png',
            'グレイン_グラデーション.png',
            'サーマル_ヒートマップ.png',
            'ジェネレーティブ_パーティクル.png',
            'ジェネレーティブ_ファブリック.png',
            'シュルレアリスム_ミニマル.png',
            'シンセウェーブ_レトロウェーブ.png',
            'ステージライティング.png',
            'ステッカー_ボム.png',
            'スプリットスクリーン.png',
            'センターフォーカス.png',
            'ソーラーパンク.png',
            'ダークモード_グラデーション.png',
            'タイポグラフィ_ポートレート.png',
            'タイポグラフィ_マスキング.png',
            'ダブル_エクスポージャー.png',
            'だまし絵_不可能図形.png',
            'チャットUI_プロンプト入力風.png',
            'ティール_オレンジ.png',
            'デコンストラクション_コラージュ.png',
            'テック.png',
            'デュオトーン_オーバーレイ.png',
            'ネオジャポネスク.png',
            'ネオブルータリズム .png',
            'ノリング_フラットレイ.png',
            'バウハウス_スタイル.png',
            'バキュームパッケージ.png',
            'パラメトリックアーキテクチャ.png',
            'ピクセルアート_RPG.png',
            'ピクセルアート_レトロフューチャー.png',
            'プリズム_リフレクション.png',
            'ブループリント_設計図.png',
            'フローティング.png',
            'フロステッド_モザイク.png',
            'ペンシル・トランジション.png',
            'ボクセル_アイソメトリック.png',
            'ホログラフィック_データ.png',
            'マクロ_アイ_リフレクション.png',
            'ミクストメディア_コラージュ.png',
            'メンフィス_ポップ.png',
            'モーション_ブラー.png',
            'ライダー_ポイントクラウド.png',
            'リソグラフ_ハーフトーン.png',
            'ワイヤーフレーム_メッシュ.png',
            '信頼堅実.png',
            '右画像_左文字.png',
            '左画像_右文字.png',
            '登壇者2名_対談形式.png',
            '登壇者2名_横並び.png',
            '登壇者2名_縦並び.png',
            '登壇者3名_パネルディスカッション.png',
            '登壇者3名.png',
            '登壇者6名.png',
            '箔押しラグジュアリー.png',
            '親しみ_活気.png',
            '雑誌表紙風.png',
            '黄金比_ジオメトリー.png',
            '黒板_チョークアート.png',
            '墨流し_マーブルインク.png'
        ];
        
        const nameMap = {
            '3D抽象オブジェクト': '3D Abstract Object',
            'ASCIIアート_マトリックス': 'ASCII Art Matrix',
            'FUI_ヘッドアップディスプレイ': 'FUI Head-Up Display',
            'Z型視線誘導': 'Z-Pattern Eye Flow',
            'アールデコ': 'Art Deco',
            'アイソメトリック': 'Isometric',
            'アシッドグラフィックス': 'Acid Graphics',
            'エディトリアル_スタジオ': 'Editorial Studio',
            'オリガミ_ポリゴン': 'Origami Polygon',
            'ガラス_アンド_ウォーター': 'Glass and Water',
            'キネティック_タイポグラフィ': 'Kinetic Typography',
            'クリエイティブ_洗練': 'Creative Refined',
            'クレイモーフィズム': 'Claymorphism',
            'グレイン_グラデーション': 'Grain Gradient',
            'サーマル_ヒートマップ': 'Thermal Heatmap',
            'ジェネレーティブ_パーティクル': 'Generative Particles',
            'ジェネレーティブ_ファブリック': 'Generative Fabric',
            'シュルレアリスム_ミニマル': 'Surrealism Minimal',
            'シンセウェーブ_レトロウェーブ': 'Synthwave Retro Wave',
            'ステージライティング': 'Stage Lighting',
            'ステッカー_ボム': 'Sticker Bomb',
            'スプリットスクリーン': 'Split Screen',
            'センターフォーカス': 'Center Focus',
            'ソーラーパンク': 'Solarpunk',
            'ダークモード_グラデーション': 'Dark Mode Gradient',
            'タイポグラフィ_ポートレート': 'Typography Portrait',
            'タイポグラフィ_マスキング': 'Typography Masking',
            'ダブル_エクスポージャー': 'Double Exposure',
            'だまし絵_不可能図形': 'Optical Illusion Impossible Shape',
            'チャットUI_プロンプト入力風': 'Chat UI Prompt Input',
            'ティール_オレンジ': 'Teal Orange',
            'デコンストラクション_コラージュ': 'Deconstruction Collage',
            'テック': 'Tech',
            'デュオトーン_オーバーレイ': 'Duotone Overlay',
            'ネオジャポネスク': 'Neo-Japonism',
            'ネオブルータリズム ': 'Neo-Brutalism',
            'ノリング_フラットレイ': 'No Ring Flat Lay',
            'バウハウス_スタイル': 'Bauhaus Style',
            'バキュームパッケージ': 'Vacuum Package',
            'パラメトリックアーキテクチャ': 'Parametric Architecture',
            'ピクセルアート_RPG': 'Pixel Art RPG',
            'ピクセルアート_レトロフューチャー': 'Pixel Art Retro Future',
            'プリズム_リフレクション': 'Prism Reflection',
            'ブループリント_設計図': 'Blueprint Design',
            'フローティング': 'Floating',
            'フロステッド_モザイク': 'Frosted Mosaic',
            'ペンシル・トランジション': 'Pencil Transition',
            'ボクセル_アイソメトリック': 'Voxel Isometric',
            'ホログラフィック_データ': 'Holographic Data',
            'マクロ_アイ_リフレクション': 'Macro Eye Reflection',
            'ミクストメディア_コラージュ': 'Mixed Media Collage',
            'メンフィス_ポップ': 'Memphis Pop',
            'モーション_ブラー': 'Motion Blur',
            'ライダー_ポイントクラウド': 'Lidar Point Cloud',
            'リソグラフ_ハーフトーン': 'Risograph Halftone',
            'ワイヤーフレーム_メッシュ': 'Wireframe Mesh',
            '信頼堅実': 'Trustworthy Solid',
            '右画像_左文字': 'Right Image Left Text',
            '左画像_右文字': 'Left Image Right Text',
            '登壇者2名_対談形式': '2 Speakers Interview',
            '登壇者2名_横並び': '2 Speakers Horizontal',
            '登壇者2名_縦並び': '2 Speakers Vertical',
            '登壇者3名_パネルディスカッション': '3 Speakers Panel Discussion',
            '登壇者3名': '3 Speakers',
            '登壇者6名': '6 Speakers',
            '箔押しラグジュアリー': 'Foil Stamping Luxury',
            '親しみ_活気': 'Friendly Energetic',
            '雑誌表紙風': 'Magazine Cover Style',
            '黄金比_ジオメトリー': 'Golden Ratio Geometry',
            '黒板_チョークアート': 'Blackboard Chalk Art',
            '墨流し_マーブルインク': 'Suminagashi Marble Ink'
        };
        
        this.images = imageFiles.map((file, index) => {
            const fileName = file.replace('.png', '');
            const englishName = nameMap[fileName] || fileName;
            return {
                src: `img/${file}`,
                name: englishName,
                index: index
            };
        });
    }
    
    createItems() {
        this.coverflow.innerHTML = '';
        this.items = this.images.map((image, i) => {
            const item = document.createElement('div');
            item.className = 'cover-item';
            
            const wrapper = document.createElement('div');
            wrapper.className = 'cover-item-wrapper';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.name;
            img.loading = 'lazy';
            
            wrapper.appendChild(img);
            item.appendChild(wrapper);
            
            // Add click listener for navigation
            item.addEventListener('click', () => {
                if (this.currentIndex !== i) {
                    this.currentIndex = i;
                    this.update();
                    this.updateInfo();
                }
            });
            
            this.coverflow.appendChild(item);
            return item;
        });
    }
    
    update() {
        this.items.forEach((item, i) => {
            const offset = i - this.currentIndex;
            let transform = '';
            let zIndex = 0;
            let opacity = 1;
            
            if (offset === 0) {
                // Center item
                transform = `translate3d(0, 0, 0) rotateY(0deg)`;
                zIndex = 1000;
            } else {
                // Side items
                const sign = Math.sign(offset);
                const absOffset = Math.abs(offset);
                
                // Stack items closely
                const x = sign * (this.X_OFFSET + (absOffset - 1) * 50); 
                const z = -this.Z_DEPTH;
                const rotate = -sign * this.Y_ROTATION;
                
                transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotate}deg)`;
                zIndex = 1000 - absOffset;
                
                // Fade out distant items
                if (absOffset > 3) {
                    opacity = Math.max(0, 1 - (absOffset - 3) * 0.3);
                }
            }
            
            item.style.transform = transform;
            item.style.zIndex = zIndex;
            item.style.opacity = opacity;
        });
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
        
        this.coverflow.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY > 0) {
                this.next();
            } else {
                this.prev();
            }
        }, { passive: false });
        
        // Touch support
        let touchStartX = 0;
        this.coverflow.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        this.coverflow.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while swiping
        }, { passive: false });
        
        this.coverflow.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.update();
            this.updateInfo();
        }
    }
    
    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.update();
            this.updateInfo();
        }
    }
    
    updateInfo() {
        const currentImage = this.images[this.currentIndex];
        this.imageName.textContent = currentImage.name;
        this.imageCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CoverFlow();
});
