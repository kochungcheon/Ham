package com.team.teamrestructuring.view.activities

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.*
import android.widget.FrameLayout
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.google.android.gms.tasks.OnCompleteListener
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.messaging.FirebaseMessaging
import com.team.teamrestructuring.R
import com.team.teamrestructuring.databinding.ActivityHomeBinding
import com.team.teamrestructuring.view.adapters.ViewPagerAdapter
import com.team.teamrestructuring.view.fragments.GuildFragment


private const val TAG = "HomeActivity_지훈"
class HomeActivity : AppCompatActivity(),BottomNavigationView.OnNavigationItemSelectedListener{

    companion object{
        const val channel_id = "team_channel"
    }
    private lateinit var auth:FirebaseAuth
    private lateinit var binding : ActivityHomeBinding
    private val frameLayout:FrameLayout by lazy{
        binding.framelayoutMainFrame
    }
    private val bottomNavigation:BottomNavigationView by lazy{
        binding.bottomnavigationHomeNav
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        auth = FirebaseAuth.getInstance()
        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        init()

    }

    /**
     * HomeActivity 초기화
     */

    @RequiresApi(Build.VERSION_CODES.O)
    private fun init(){
        getFCM()
        setViewPager()
        setFullScreen()
        checkNotificationSelected()
    }

    /**
     * viewPager adapter 연결
     */
    private fun setViewPager(){
        binding.viewpagerMainPager.adapter = ViewPagerAdapter(this)
        binding.viewpagerMainPager.registerOnPageChangeCallback(object :ViewPager2.OnPageChangeCallback(){
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                binding.bottomnavigationHomeNav.menu.getItem(position).isChecked = true
            }
        })
        binding.bottomnavigationHomeNav.setOnNavigationItemSelectedListener(this)
    }

    /**
     * 상태표시줄 , 하단 네비게이션 없애기기
    */
    private fun setFullScreen(){
        //Android 11(R) 대응
        if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.R){
            supportActionBar?.hide()
            window.setDecorFitsSystemWindows(false)
            val controller = window.insetsController
            if(controller!=null){
                controller.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
                controller.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        }else{ //R버전 이하 대응
            supportActionBar?.hide()
            window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_IMMERSIVE or
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    or View.SYSTEM_UI_FLAG_FULLSCREEN)
        }
    }
    /**
     * Notification 수신을 위한 채널 추가
     */
    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel(id:String, name:String){
        val importance = NotificationManager.IMPORTANCE_DEFAULT
        val channel = NotificationChannel(id,name,importance)

        val notificationManager : NotificationManager
                = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)
    }

    /**
     * Noti를 클릭해서 들어온 경우 QuestFragment로 이동
     */
    private fun checkNotificationSelected(){
        val intent_data = intent.getStringArrayExtra("clicknoti")
        Log.d(TAG, "checkNotificationSelected: ${intent_data}")
        if(intent_data!=null){
            binding.viewpagerMainPager.currentItem = 2
        }
    }
    /**
     * Home화면을 default로 한 bottomNavigation 설정
     * setOnNavigationItemSelectedListener is Deprecated
     * setOnItemSelectedListener 사용
     */
    override fun onNavigationItemSelected(item: MenuItem): Boolean {
            when(item.itemId){
            R.id.menu_home ->{
                binding.viewpagerMainPager.currentItem = 0
                return true
            }
            R.id.menu_todo ->{
                binding.viewpagerMainPager.currentItem = 1
                return true
            }
            R.id.menu_guild ->{
                binding.viewpagerMainPager.currentItem = 2
                return true
            }
            R.id.menu_my_page ->{
                binding.viewpagerMainPager.currentItem = 3
                return true
            }
            else -> return false
        }

    }




    /**
     * FCM 토큰 수신
     */
    @RequiresApi(Build.VERSION_CODES.O)
    private fun getFCM(){
        Log.d("token TAG", "getFCM: ")
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener{
            if(!it.isSuccessful){
                Log.d("token TAG", "FCM 토큰 얻기에 실패하였습니다",it.exception)
                return@OnCompleteListener
            }
            //token 정보 남기기
            Log.d("token TAG", "token 정보 : ${it.result?:"token is null"}")
        })
        createNotificationChannel(channel_id,"team9")
    }

}