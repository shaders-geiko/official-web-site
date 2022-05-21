window.addEventListener('DOMContentLoaded', init);
function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    // ウィンドウサイズ設定
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);

 
    // シーンを作成
    const scene = new THREE.Scene();
 
    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, 1000);
    
    //camera.lookAt(new THREE.Vector3(0, 400, 0));

    // Load GLTF or GLB
    var loader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('js/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);
    
    const url = 'models/gakumu.glb';
    
    let model = null;
    loader.load(
        url, 
        function ( gltf ){
            model = gltf.scene;
            model.name = "model_with_cloth";
            model.scale.set(4, 4, 4);
            model.position.set(1, -300,1);
            scene.add( gltf.scene );

            model["test"] = 100;
            console.log("model");
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log( error );
        }
    );
    renderer.gammaOutput = true;

    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    // シーンに追加
    scene.add(light);

    // 初回実行
    window.addEventListener('scroll', tick);
    function tick() {
      model.rotation.y = window.scrollY*0.001;
      // レンダリング
      renderer.render(scene, camera);
    }

    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);
    function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        console.log(width);
    }
}