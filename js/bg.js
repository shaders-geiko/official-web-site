window.addEventListener('DOMContentLoaded', init);
function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    // ウィンドウサイズ設定
    width = window.innerWidth;
    height = window.innerHeight;

 
    // シーンを作成
    const scene = new THREE.Scene();
 
    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 850,1000);
    // camera.lookAt(new THREE.Vector3(0, 700, 0));

    // Load GLTF or GLB
    var loader = new THREE.GLTFLoader();
    var dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('js/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);
    
    const url = 'models/funsuidraco1.glb';
    
    let model = null;
    loader.load(
        url, 
        function ( gltf ){
            model = gltf.scene;
            model.name = "model_with_cloth";
            model.scale.set(200, 200, 200);
            model.rotation.y = 300
            // model.position.set(1, -300,1);
            scene.add( gltf.scene );

            model["test"] = 100;
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log( error );
        }
    );
    renderer.gammaOutput = true;
    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 0.5; // 光の強さを倍に
    light.position.set(1, 1,1);
    // シーンに追加
    scene.add(light);
    
    // 初回実行
    window.addEventListener('scroll', tick);
    function tick() {
      model.rotation.y =300+ window.scrollY*0.005;
      // レンダリング
      renderer.render(scene, camera);
    }
    onResize();
    window.addEventListener('resize', onResize);
    function onResize() {
        // サイズを取得
        const width1 = window.innerWidth;
        const height1 = window.innerHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width1, height1);
        // カメラのアスペクト比を正す
        camera.aspect = width1 / height1;
        camera.updateProjectionMatrix();
        camera.position.set(0, 850,2200-width1*1.1);
        console.log(width1);
        renderer.render(scene, camera);
    }
}