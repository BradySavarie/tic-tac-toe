<h1>❌ Tic-Tac-Toe</h1>

<h2>A Browser-Based Tic-Tac-Toe Game!</h2>

<div style='flex'>
<img width="350" alt="Pre-Game Screen" src="https://user-images.githubusercontent.com/106128212/220511412-fbf17af1-b6ff-477e-9d6f-a596a7f9ec30.png">
<img width="350" alt="In-Game Screen" src="https://user-images.githubusercontent.com/106128212/220511434-1e11d6e5-e302-4750-88f5-7a66613387c0.png">
</div>

<i>This application is a browser-based recreation of the classic 2-player game Tic-Tac-Toe. To play a round both players must enter their names or use the defaults provided and click the start game button. The highlighted player can click a square to place a marker or hit the back button to return to the home screen.</i>

 <hr>
 
This application is a part of The Odin Projects Full-Stack Javascript curriculum and was developed with the purpose of solidifying my ability to code a program using the module pattern and generate objects using factory functions. I also decided to learn Tailwind and apply it to styling this game for the sake of getting some experience working with a framework under my belt.

<h3>What I Learned</h3>

The module pattern is a great way to keep the global scope clear and group related code together into logical units. IIFE's will definitely come in handy to execute only the code I need, store some properties and methods privately, and strategically reveal the rest publically to allow the remaining modules easy access. It is nice having different namespaces to work in as well to reduce the mental burden involved with naming variables that serve very similar purposes.

I found working with Tailwind was an excellent experience and solved alot of the styling problems that I ran into during my last project (myLibrary). I was hesitant to embrace utility classes because it directly contradicts the advice i've received about separating my concerns, and it results in some pretty ugly markup. My experience so far is that my productivity seemed to improve since I didn't have to switch between files, the classes actually present alot of useful information that at first felt like clutter but quickly became convenient, and working within the confines of a well-structured design system helps speed up my decision-making and results in consistency. I love that it's also easily configurable for when I inevitably will need to break their rules.

<h3>What I Would Do Differently</h3>

In retrospect I think I may have gone overboard with the logic involved with checking for wins. Rather than opt for a solution that checks game board values against an array of pre-set win conditions I had decided to write code that wouldn't rely on any hard coded values. I figured that if I wanted to allow the user to choose between different board sizes than this would allow for that, however I don't intend on adding that functionality into the game considering I have bigger projects to move on to. While it was good practice for writing nested loops over 2D arrays I do believe this code could be optimized quite a bit by checking hard-coded solutions.

I wouldn't change my decision to learn and use Tailwind for this project, but I can't help but feel i've missed out on an opportunity to get more comfortable with using scss syntax and BEM naming conventions. I had configured sass initially but ultimately decided to opt for the Post-CSS framework approach. In future projects I would like to use a pre-processor so I can make more informed decisions about which alternative is best for different situations.
