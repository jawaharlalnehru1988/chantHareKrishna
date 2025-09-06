import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { LanguageService, LanguageType } from '../services/language.service';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-how-to-chant',
  templateUrl: './how-to-chant.page.html',
  styleUrls: ['./how-to-chant.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons]
})
export class HowToChantPage implements OnInit, OnDestroy {
  
  // Current language and theme
  currentLanguage: LanguageType = 'english';
  themeClass: string = '';
  
  // Subscriptions
  private languageSubscription?: Subscription;
  private themeSubscription?: Subscription;

  constructor(private languageService: LanguageService, private themeService: ThemeService) {
    addIcons({ checkmarkCircleOutline, informationCircleOutline });
  }

  ngOnInit() {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass = `theme-${theme}`;
    });
  }
  
  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
    this.themeSubscription?.unsubscribe();
  }
  
  // Get current language content
  get currentGuide() {
    const guide = this.chantGuide.find(g => g.language === this.currentLanguage);
    return guide || this.chantGuide.find(g => g.language === 'english') || this.chantGuide[0];
  }

  chantGuide = [
    {
      language: 'english' as LanguageType,
      content: `<h1>🌼 <strong>How to Use This Application for Chanting the Hare Krishna Mahamantra</strong></h1>
      <img src="assets/images/chantPage.png" alt="Chanting Page Screenshot" style="width:100%;max-width:400px;margin:10px 0;">
      <p>When you <strong>open the application</strong> 📱, you will first see an interface that looks like this:</p><p>Although this page is quite <strong>self-explanatory</strong>, I would still like to give you a <strong>brief overview</strong> 📝.<br>
This will help you <strong>use the application in the proper sequence of chanting</strong>, following the <strong>traditional method</strong> of chanting the Hare Krishna Mahamantra as taught by <strong>His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada</strong> and the <strong>previous acharyas</strong> (spiritual teachers). 🙏</p>

<h2>🌸 <strong>Before We Start Chanting</strong></h2>
<img src="assets/images/prabhupada.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>Before beginning to chant, it is important to first <strong>seek the mercy</strong> of our spiritual teacher, <strong>Srila Prabhupada</strong> 🌹, who is the recent acharya (spiritual master) of the <strong>Hare Krishna movement</strong>.<br>
By receiving <strong>his mercy</strong>, we also gain the <strong>mercy of Sri Chaitanya Mahaprabhu</strong> 🌼.</p><p>Offering our <strong>humble obeisances</strong> by reciting <strong>Srila Prabhupada’s Pranama Mantra</strong> 🙇‍♂️ is a very important step in making progress on the path of <strong>successful chanting</strong> of the Hare Krishna Mahamantra.</p><ul>
<li>
<p>On the <strong>top-right corner</strong> of the page, you will see a <strong>round icon</strong> 🖼️ with <strong>Srila Prabhupada’s picture</strong>.</p>
</li>
<li>
<p>When you <strong>click on this icon</strong>, the mantra will be <strong>displayed on the screen</strong>, and you will also <strong>hear the audio</strong> of Srila Prabhupada’s Pranama Mantra 🔊.</p>
</li>
</ul><h3>✨ <strong>Srila Prabhupada's Pranama Mantra:</strong></h3><p><em>Namah om Vishnupadaya Krishna Presthaya Bhootale</em><br>
<em>Srimate Bhaktivedanta Swamin iti Namine</em><br>
<em>Namaste Saraswate Deve Gauravani Pracharine</em><br>
<em>Nirvishesha Shunyavadipashchatya Desha Tarine</em></p><p>When you <strong>start chanting for the first time each day</strong>, begin by <strong>reciting this mantra</strong> 🙏.<br>
This helps you <strong>enter a mood of humility</strong> — to see yourself as the <strong>servant of the servant of Lord Krishna</strong> 🪷.<br>

This mindset is <strong>very important</strong> to receive the <strong>mercy of Lord Krishna</strong> through His <strong>holy name</strong>. 🌼</p>
<h2>🌿 <strong>Next Step – Pancha Tattva Mantra</strong></h2><p>On the <strong>top-left corner</strong> of the page, you will see a <strong>round picture</strong> 🖼️ of <strong>Lord Chaitanya Mahaprabhu</strong> along with His <strong>intimate associates</strong>.<br>

When you <strong>click on this image</strong>, you will <strong>hear the Pancha Tattva Mantra</strong>, which is traditionally <strong>chanted before the Hare Krishna Mahamantra</strong>.</p>
<h3>🌸 <strong>Pancha Tattva Mantra</strong></h3>
<img src="assets/images/panchaTatva.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p><em>Jai Sri Krishna Chaitanya Prabhu Nityananda</em><br>

<em>Sri Advaita Gadadhara</em><br>
<em>Sri Vasadi Gaura Bhakta Vrinda</em></p><p>This mantra should be <strong>chanted after completing each round</strong>.</p><ul>
<li>
<p><strong>One round = chanting the Hare Krishna Mahamantra 108 times</strong> 🔢.</p>
</li>
<li>
<p>After you <strong>finish one full round</strong>, chant the <strong>Pancha Tattva Mantra</strong> before starting the <strong>next round</strong>.</p>
</li>
</ul><h2>🙏 <strong>Why We Chant This Mantra</strong></h2><p>The reason we chant this mantra is to <strong>honor and remember Lord Chaitanya Mahaprabhu</strong> 🌼, who is <strong>Lord Krishna Himself</strong> appearing in this world about <strong>500 years ago</strong>.</p><ul>
<li>
<p>Lord Chaitanya came to <strong>spread the holy name of Krishna</strong> and <strong>start the Sankirtan movement</strong> 🎶, which is the <strong>congregational chanting</strong> of the Hare Krishna Mahamantra.</p>
</li>
</ul><p>He, along with His <strong>intimate associates</strong>:<br>
✨ <strong>Nityananda Prabhu</strong><br>
✨ <strong>Advaita Acharya</strong><br>
✨ <strong>Gadadhara Prabhu</strong><br>
✨ <strong>Srivasa Pandit</strong></p><p>and <strong>thousands of devotees</strong>, generously <strong>distributed the Hare Krishna Mahamantra</strong> to everyone 🌍 without discrimination.</p><blockquote>
<p>It is <strong>only by Their mercy</strong> that we have received this <strong>Mahamantra</strong> today.<br>
Chanting the <strong>Pancha Tattva Mantra</strong> is our way to <strong>express gratitude</strong> 💛 and <strong>offer humble obeisances</strong> 🌺 at Their lotus feet before continuing to chant.</p>
</blockquote>

<h2>🪷 <strong>Chanting the Holy Name of Krishna</strong></h2>

<p>In the <strong>center of the page</strong>, you will find the <strong>main area</strong> where you can <strong>begin chanting the Hare Krishna Mahamantra</strong>.</p>
<img src="assets/images/hareKrishna.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<h3>🌼 <strong>Hare Krishna Mahamantra</strong></h3><p><em>Hare Krishna Hare Krishna Krishna Krishna Hare Hare</em><br>
<em>Hare Rama Hare Rama Rama Rama Hare Hare</em></p><p>This mantra is displayed on the screen to <strong>help you stay focused</strong> 🎯.</p><ul>
<li>
<p>Sometimes, when you <strong>open your eyes</strong>, your mind may <strong>get distracted</strong> by things around you.</p>
</li>
<li>
<p>By <strong>looking at the mantra</strong> while chanting, your <strong>focus returns</strong> to the holy names, helping you <strong>stay absorbed</strong> in devotion.</p>
</li>
</ul><h2>🎛️ <strong>Chanting Options</strong></h2>

<img src="assets/images/soundOption.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">

<p>Just <strong>above the mantra</strong>, you will see a <strong>round circle icon</strong> 🔘.</p><ul>
<li>
<p>When you <strong>click on this circle</strong>, a <strong>list of options</strong> will appear.</p>
</li>
<li>
<p>These options allow you to <strong>choose how you want to chant</strong> — <strong>with or without sound</strong> 🔊.</p>
</li>
</ul><h3><strong>Chanting Modes Explained</strong></h3><p>Here are the <strong>four available modes</strong>:</p><ol>
<li>
<p><strong>🤫 Silent Mode (Default)</strong></p>
<ul>
<li>
<p>No sound will play.</p>
</li>
<li>
<p>You can <strong>chant silently or softly</strong> while focusing on the displayed mantra.</p>
</li>
</ul>
</li>
<li>
<p><strong>✔️ Tick Sound Mode</strong></p>
<ul>
<li>
<p>A <strong>tick sound</strong> plays each time you press the chant button.</p>
</li>
<li>
<p>Helps you <strong>track your count</strong> and avoid losing track.</p>
</li>
</ul>
</li>
<li>
<p><strong>🎵 Chanting Along with Srila Prabhupada</strong></p>
<ul>
<li>
<p>Each time you press the chant button, you will <strong>hear Srila Prabhupada’s divine chanting</strong>.</p>
</li>
<li>
<p>This allows you to <strong>chant in sync with Srila Prabhupada</strong>.</p>
</li>
</ul>
</li>
<li>
<p><strong>🔁 Continuous Chanting by Srila Prabhupada</strong></p>
<ul>
<li>
<p><strong>No need to press the button</strong>.</p>
</li>
<li>
<p>Srila Prabhupada’s chanting plays <strong>continuously</strong>, and the <strong>count increases automatically</strong>.</p>
</li>
<li>
<p>Perfect for <strong>silent, background chanting</strong> where others may not notice.</p>
</li>
</ul>
</li>
</ol><h2>🔘 <strong>Chanting Button and Counter</strong></h2>
<img src="assets/images/countButton.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>At the <strong>bottom of the page</strong>, you will see:</p><ul>
<li>
<p><strong>The Chanting Button</strong> 🔘</p>
</li>
<li>
<p>A <strong>round circle</strong> with the <strong>current count displayed</strong> 🔢.</p>
</li>
</ul><p>Every time you <strong>press the chanting button</strong>, the count <strong>increases by one</strong>, helping you <strong>track your progress</strong> toward completing one full round (108 chants).</p>
<img src="assets/images/threeBox.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<h2>📊 <strong>Additional Display Boxes</strong></h2><p>Above the chanting button, there are <strong>three boxes</strong> for better tracking:</p><ul>
<li>
<p><strong>Left-most box</strong> 📥 – Shows <strong>mantras chanted out of 108</strong>.</p>
<ul>
<li>
<p>Once it reaches <strong>108</strong>, you’ve <strong>completed one round</strong>.</p>
</li>
</ul>
</li>
<li>
<p><strong>Center box</strong> 📈 – Automatically <strong>increases by 1</strong> when a round is completed.</p>
<ul>
<li>
<p>Shows <strong>how many rounds</strong> you’ve finished.</p>
</li>
</ul>
</li>
<li>
<p><strong>Right-most box</strong> 🕉️ – Tracks <strong>Maha Rounds</strong> (1 Maha Round = 16 regular rounds).</p>
</li>
</ul><h2>🗓️ <strong>Daily Chanting Practice</strong></h2><p>You can chant <strong>as many rounds as possible</strong> each day, based on your time and dedication.</p><h3>🌱 <strong>For Beginners:</strong></h3><ul>
<li>
<p>Start with <strong>1 round per day</strong>.</p>
</li>
<li>
<p>Gradually <strong>increase the number of rounds</strong> as your interest grows.</p>
</li>
</ul><h3>🎯 <strong>Recommended Standards:</strong></h3><ul>
<li>
<p>1 round per day</p>
</li>
<li>
<p>2 rounds per day</p>
</li>
<li>
<p>4 rounds per day</p>
</li>
<li>
<p>8 rounds per day</p>
</li>
<li>
<p>12 rounds per day</p>
</li>
<li>
<p><strong>16 rounds per day</strong> – <em>minimum standard recommended by Srila Prabhupada</em> 🙏</p>
</li>
</ul><blockquote>
<p><strong>Note:</strong> Chanting <strong>16 rounds</strong> takes about <strong>2 hours</strong>.<br>
Don’t feel overwhelmed — the <strong>Hare Krishna Mahamantra is very sweet</strong> 🍯 and brings <strong>peace and happiness</strong> 🌸.</p>
</blockquote><h2>🕉️ <strong>Maha Round Tracking</strong></h2><p>The <strong>right-most box</strong> tracks <strong>Maha Rounds</strong>:</p><ul>
<li>
<p><strong>1 Maha Round = 16 rounds</strong>.</p>
</li>
<li>
<p>Example: Some devotees chant <strong>4 Maha Rounds per day</strong>, which equals:</p>
<ul>
<li>
<p>4 × 16 = <strong>64 rounds per day</strong> 🔢.</p>
</li>
</ul>
</li>
</ul><p>This is helpful for <strong>advanced practitioners</strong> with higher chanting goals.</p>
<h2>🌈 <strong>Visual Progress Indicator</strong></h2>
<img src="assets/images/progressbar.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>As you <strong>approach 108 chants</strong>, a <strong>beautiful circular indicator</strong> appears around the chanting button 🌟.<br>
This gives you a <strong>clear visual sense of progress</strong>, keeping you <strong>motivated and inspired</strong>.</p>

<h2>🌍 <strong>Choosing Your Preferred Language</strong></h2>
<img src="assets/images/languageChoice.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>This application supports <strong>multiple languages</strong> for a <strong>personalized experience</strong>.</p><ul>
<li>
<p>Currently available: <strong>English + 10 Indian languages</strong>.</p>
</li>
<li>
<p>When you <strong>select a language</strong>, the <strong>entire interface switches</strong> to that language automatically 🔄.</p>
</li>
</ul><p>This makes chanting <strong>easier to understand and follow</strong> for devotees across different regions.</p><h2>🤝 <strong>Need Help or Suggestions?</strong></h2><p>If you have <strong>suggestions or requests</strong>, please contact me:</p><p><strong>Name:</strong> Narasimha Dasa<br>
📞 <strong>Phone:</strong> +91 6382043976</p><ul>
<li>
<p>If you want a <strong>new language added</strong>, kindly <strong>share the translated content</strong>, and I will integrate it into the application so more devotees can benefit. 🙏</p>
</li>
</ul><h2>🌸 <strong>Chant and Be Happy</strong></h2><p><em>Hare Krishna Hare Krishna Krishna Krishna Hare Hare</em><br>
<em>Hare Rama Hare Rama Rama Rama Hare Hare</em></p><p>By sincerely chanting this <strong>Hare Krishna Mahamantra</strong>, you will <strong>experience true peace</strong> 🕊️ and <strong>divine happiness</strong> 🌺.</p><p><!--StartFragment-->`
 },
 {
  language: 'tamil' as LanguageType,
  content: `<h1>🌸 ஹரே கிருஷ்ண மஹாமந்திரத்தை ஜபிக்க இந்த செயலியை(app) எப்படி பயன்படுத்துவது? 🌸</h1><h1><!--StartFragment-->
      <img src="assets/images/chantPage.png" alt="Chanting Page Screenshot" style="width:100%;max-width:400px;margin:10px 0;">
  <p>இந்த&nbsp;<span style="font-size: 1.625rem; color: rgb(255, 255, 255);">செயலியை&nbsp;</span><span style="font-size: 1.625rem; color: rgb(255, 255, 255);">திறந்தவுடன், நீங்கள் முதலில் இவ்வாறு காணப்படும் ஒரு இடைமுகத்தை (interface) காண்பீர்கள். 🖥️</span></p></h1><h1>
<p>இப்பக்கம் தன்னிச்சையாகவே விளக்கமாக இருக்கும், ஆனால் நீங்கள் <strong>ஸ்ரீல பிரபுபாதர்</strong> மற்றும் முன்னோடி ஆச்சார்யர்கள் கற்றுக் கொடுத்த பாரம்பரிய முறையில், சரியான முறையில் ஹரே கிருஷ்ண மஹாமந்திரத்தை ஜபிப்பதற்காக ஒரு சிறிய விளக்கத்தை நான் தர விரும்புகிறேன். 🙏</p>

</h1><h2>🌺 ஜபத்தை தொடங்குவதற்கு முன்</h2><h1>
<img src="assets/images/prabhupada.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>ஜபத்தை ஆரம்பிப்பதற்கு முன், முதலில் நம் ஆன்மிக குருவான <strong>ஸ்ரீல பிரபுபாதரின்</strong> கருணையை நாடுவது மிக முக்கியம். ✨<br>
அவரின் கருணையைப் பெறுவதன் மூலம், நாமும் <strong>ஸ்ரீ சைதன்ய மகாபிரபுவின்</strong> கருணையையும் பெறுகிறோம்.</p>
<p>அதனால், முதலில் <strong>ஸ்ரீல பிரபுபாதரின் பிரணாம மந்திரத்தை</strong> ஜபிப்பது முக்கியமான ஒரு படியாகும். 🌸</p>

</h1><h3>🖼️ <em>ஸ்ரீல பிரபுபாதரின் பிரணாம மந்திரம்</em></h3><h1>
<p>பக்கத்தின் <strong>மேல்திசை வலது மூலையில்</strong>, ஸ்ரீல பிரபுபாதரின் படம் கொண்ட ஒரு வட்ட ஐகான் காண்பீர்கள்.<br>
அதை கிளிக் செய்தவுடன், அந்த மந்திரம் திரையில் தோன்றும், மேலும் ஸ்ரீல பிரபுபாதரின் குரலில் ஜப ஒலியும் கேட்கப்படும். 🎧</p>
<p>மந்திரம்:</p>
<div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!">நம ஓம் விஷ்ணுபாதாய கிருஷ்ண பிரேஷ்தாய பூதலே  
ஸ்ரீமதே பக்திவேதாந்த ஸ்வாமின் இதி நாமினே!</code></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><br></code></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!">நமஸ்தே ஸாரஸ்வதே தேவே கௌர வாணி ப்ரசாரினே  
நிர்விஷேஷ ஸூன்யவாதிம் பாஷ்சாத்ய தேஷ தாரினே
</code></div></div>
<blockquote>
<p>இந்த மந்திரத்தை <strong>ஒவ்வொரு நாளும் ஜபம் தொடங்குவதற்கு முன்</strong> ஜபிக்க வேண்டும்.<br>
இதன் மூலம் நம்மை <strong>தாழ்மையான மனநிலைக்கு</strong> கொண்டு செல்லலாம், இது <strong>ஸ்ரீ கிருஷ்ணரின் கருணையை</strong> பெற முக்கியமானது. 🌼</p>
</blockquote>

</h1><h2>🌟 அடுத்த படி – பஞ்ச தத்த்வ மந்திரம்</h2><h1>
<img src="assets/images/panchaTatva.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>பக்கத்தின் <strong>மேல்திசை இடது மூலையில்</strong>, <em>ஸ்ரீ சைதன்ய மகாபிரபுவும்</em> அவருடைய நெருங்கிய சகாக்களும் உள்ள ஒரு வட்ட படத்தை காண்பீர்கள்.</p>
<p>அதை கிளிக் செய்தவுடன், <strong>பஞ்ச தத்த்வ மந்திரம்</strong> ஒலிக்கும். 🎵</p>
</h1><h3>பஞ்ச தத்த்வ மந்திரம் 🙌</h3><h1>
<div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!">ஜய ஸ்ரீ கிருஷ்ண சைதன்ய ப்ரபு நித்யானந்தா  
ஸ்ரீ அத்வைத கதாகாரா  
ஸ்ரீவாசாதி கௌர பக்த வ்ருந்தா
</code></div></div>
<blockquote>
<p><strong>ஒவ்வொரு சுற்றையும் (Round) முடித்த பின்</strong>, அடுத்த சுற்றை தொடங்கும் முன் இந்த மந்திரத்தை ஜபிக்க வேண்டும். 🔁</p>
<p><strong>1 சுற்று = 108 முறை மஹாமந்திரம் ஜபித்தல்</strong></p>
</blockquote>

</h1><h2>🌼 ஏன் இந்த மந்திரத்தை ஜபிக்க வேண்டும்?</h2><h1>
<p>இந்த மந்திரத்தை ஜபிப்பது, <strong>ஸ்ரீ சைதன்ய மகாபிரபுவை நினைவு கூர்வதற்கும்</strong>, அவருடைய கருணையை நாடுவதற்கும் ஆகும்.<br>
அவர் <strong>சங்கீர்த்தன இயக்கத்தை</strong> (கூட்டமாக ஹரே கிருஷ்ண மஹாமந்திரம் ஜபிப்பதை) உலகமெங்கும் பரப்ப வந்தார். 🌍</p>
<p><strong>அவருடன் இருந்தவர்கள்:</strong></p>
<ul>
<li>
<p>🙏 நித்யானந்த ப்ரபு</p>
</li>
<li>
<p>🌺 அத்வைத ஆச்சார்யர்</p>
</li>
<li>
<p>🌸 கதாகார ப்ரபு</p>
</li>
<li>
<p>🌼 ஸ்ரீவாச பண்டிதர்</p>
</li>
</ul>

</h1><h2>🎵 ஹரே கிருஷ்ண மஹாமந்திரம் ஜபித்தல்</h2><h1>
<p>பக்கத்தின் <strong>நடுத்திசையில்</strong>, ஹரே கிருஷ்ண மஹாமந்திரம் ஜபிக்க இடம் இருக்கும்.</p>
<p>மஹாமந்திரம்:</p>
<div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!">ஹரே கிருஷ்ண ஹரே கிருஷ்ண கிருஷ்ண கிருஷ்ண ஹரே ஹரே&nbsp;</code></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><br></code></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!">ஹரே ராம ஹரே ராம ராம ராம ஹரே ஹரே
</code></div></div>
<img src="assets/images/hareKrishna.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<blockquote>
<p>இந்த மந்திரம் திரையில் காட்டப்படும், இதன் மூலம் உங்கள் கவனம் திசைதிரியாமல் இருக்கும். 🧘‍♂️</p>
</blockquote>

</h1><h2>🎛️ ஜபிக்கும் விருப்பங்கள்</h2><h1>
<p>மந்திரத்தின் மேல் பகுதியில் ஒரு வட்ட ஐகான் காணப்படும்.<br>
அதை கிளிக் செய்தால், 4 விதமான முறைகள் தோன்றும்:</p>
<ol>
<li>
<p>🤫 <strong>Silent Mode (அமைதியான முறை)</strong></p>
<ul>
<li>
<p>ஒலி எதுவும் இருக்காது.</p>
</li>
<li>
<p>நீங்களே அமைதியாக ஜபிக்கலாம்.</p>
</li>
</ul>
</li>
<li>
<p>✅ <strong>Tick Sound Mode (டிக் சவுண்ட்)</strong></p>
<ul>
<li>
<p>ஒவ்வொரு முறை பட்டனை அழுத்தும் போது டிக் சவுண்ட் வரும்.</p>
</li>
<li>
<p>எண்ணிக்கையை சரியாக கண்காணிக்க உதவும்.</p>
</li>
</ul>
</li>
<li>
<p>🎙️ <strong>Chanting Along with Srila Prabhupada</strong></p>
<ul>
<li>
<p>ஸ்ரீல பிரபுபாதரின் குரலைக் கேட்டு, அதனுடன் ஜபிக்கலாம்.</p>
</li>
</ul>
</li>
<li>
<p>🔂 <strong>Continuous Chanting by Srila Prabhupada</strong></p>
<ul>
<li>
<p>எந்த பட்டனையும் அழுத்தாமல், பிரபுபாதரின் ஜபம் தொடர்ந்து ஒலிக்கும்.</p>
</li>
</ul>
</li>
</ol>

</h1><h2>🔢 ஜப பட்டன் மற்றும் எண்ணிக்கை காட்டி</h2><h1>
<img src="assets/images/countButton.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>பக்கத்தின் கீழ் பகுதியில், ஒரு <strong>வட்ட ஜப பட்டன்</strong> மற்றும் அதற்குள் தற்போதைய எண்ணிக்கை இருக்கும்.</p>
<ul>
<li>
<p>ஒவ்வொரு முறை பட்டனை அழுத்தும் போது எண்ணிக்கை 1 அதிகரிக்கும்.</p>
</li>
<li>
<p><strong>1 சுற்று = 108 முறை ஜபம்</strong> முடிந்ததும், அது தானாக அடுத்த சுற்றுக்கு நகரும்.</p>
</li>
</ul>
<img src="assets/images/threeBox.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
</h1><h2>📊 மூன்று காட்டி பெட்டிகள்</h2><h1>
<p>ஜப பட்டனின் மேல் மூன்று பெட்டிகள் இருக்கும்:</p>
<ul>
<li>
<p>📍 <strong>இடதுபுற பெட்டி</strong> – 108-ல் எத்தனை ஜபங்கள் செய்தீர்கள் என்பதை காட்டும்.</p>
</li>
<li>
<p>🔁 <strong>நடுத்திசை பெட்டி</strong> – எத்தனை முழு சுற்றுகளை முடித்தீர்கள் என்பதை காட்டும்.</p>
</li>
<li>
<p>🌟 <strong>வலதுபுற பெட்டி</strong> – <strong>மகா ரவுண்டுகள்</strong> (Maha Rounds) கண்காணிக்க உதவும்.</p>
</li>
</ul>
<p><strong>1 மகா ரவுண்ட் = 16 சுற்றுகள்</strong></p>

</h1><h2>🕒 தினசரி ஜப நடைமுறை</h2><h1>
<ul>
<li>
<p><strong>துவக்க நிலையில்:</strong> 1 சுற்று (108 முறை)</p>
</li>
<li>
<p>2 சுற்று</p>
</li>
<li>
<p>4 சுற்று</p>
</li>
<li>
<p>8 சுற்று</p>
</li>
<li>
<p>12 சுற்று</p>
</li>
<li>
<p><strong>16 சுற்று – குறைந்தபட்சமாக பரிந்துரைக்கப்பட்டது</strong> 🙏</p>
</li>
</ul>
<blockquote>
<p><strong>16 சுற்று = சுமார் 2 மணி நேரம்</strong> 🕑</p>
</blockquote>

</h1><h2>🌍 உங்கள் மொழியைத் தேர்ந்தெடுப்பது</h2><h1>
<img src="assets/images/languageChoice.png" alt="" style="width:100%;max-width:400px;margin:10px 0;">
<p>இந்த பயன்பாட்டில் தற்போது <strong>ஆங்கிலம் மற்றும் 10 இந்திய மொழிகள்</strong> கிடைக்கின்றன.<br>
உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுத்தால், <strong>முழு பயன்பாடு அந்த மொழியில்</strong> மாறும். 🗣️</p>

</h1><h2>🤝 உதவி மற்றும் பரிந்துரைகள்</h2><h1>
<p>உங்களுக்கு ஏதேனும் உதவி அல்லது மேம்பாட்டு பரிந்துரைகள் இருந்தால், என்னை தொடர்பு கொள்ளலாம்:</p>
<ul>
<li>
<p><strong>பெயர்:</strong> நரசிம்ஹ தாஸா</p>
</li>
<li>
<p><strong>தொலைபேசி:</strong> 📞 +91 6382043976</p>
</li>
</ul>
<blockquote>
<p>புதிய மொழிகளைச் சேர்க்க விரும்பினால், அதற்கான மொழிபெயர்ப்பு உள்ளடக்கத்தை வழங்கவும்.</p>
</blockquote>

</h1><h2>🌼 ஜபி, ஆனந்தமாய் இரு</h2><h1>
<div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!">ஹரே கிருஷ்ண ஹரே கிருஷ்ண கிருஷ்ண கிருஷ்ண ஹரே ஹரே  
ஹரே ராம ஹரே ராம ராம ராம ஹரே ஹரே
</code></div></div>
<blockquote>
<p>இந்த மந்திரத்தை மனமாறாமல் ஜபித்தால், உண்மையான அமைதி மற்றும் ஆனந்தத்தை பெறலாம். 🌸</p>
<p><strong>ஜய ஸ்ரீல பிரபுபாதா! 🙏</strong></p></blockquote><!--EndFragment--></h1>`
 },
 {
  language: 'hindi' as LanguageType,
  content: `<h1>🌼 <strong>इस एप्लिकेशन का उपयोग कैसे करें हरे कृष्ण महामंत्र जाप के लिए</strong></h1><p>जब आप <strong>एप्लिकेशन खोलते हैं</strong> 📱, तो आपको सबसे पहले एक इंटरफ़ेस दिखाई देगा जो इस तरह दिखता है:</p><p>हालांकि यह पृष्ठ काफी <strong>स्वयं व्याख्यात्मक</strong> है, मैं फिर भी आपको एक <strong>संक्षिप्त अवलोकन</strong> देना चाहूंगा 📝।<br>

</p>`
 },
 {
  language: 'bengali' as LanguageType,
  content: `<h1>🌼 <strong>এই অ্যাপ্লিকেশনটি কীভাবে ব্যবহার করবেন হরে কৃষ্ণ মহামন্ত্র জপের জন্য</strong></h1><p>যখন আপনি <strong>অ্যাপ্লিকেশনটি খুলবেন</strong> 📱, তখন প্রথমে আপনি একটি ইন্টারফেস দেখতে পাবেন যা এই রকম দেখায়:</p><p>যদিও এই পৃষ্ঠা বেশ <strong>স্ব-ব্যাখ্যামূলক</strong>, আমি এখনও আপনাকে একটি <strong>সংক্ষিপ্ত ওভারভিউ</strong> দিতে চাই 📝।<br>

</p>`
 },
  ]
}
