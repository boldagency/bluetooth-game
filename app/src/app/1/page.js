"use client"
import { useEffect } from "react";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin)


export default function Home() {
  useEffect(() => {
    const p1 = { left: 0, right: 0, up: 0, speed: 0, tl: null },
      p2 = { ...p1 }

    gsap.set('.car1, .car2', { scaleX: -0.15, scaleY: 0.15 })

    p1.tl = gsap.timeline({ repeat: -1 })
      .to('.car1Group', {
        ease: 'none',
        motionPath: {
          path: '#track',
          align: '#track',
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        }
      })
      .pause(0.01)

    p2.tl = gsap.timeline({ repeat: -1 })
      .to('.car2Group', {
        ease: 'none',
        motionPath: {
          path: '#track',
          align: '#track',
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        }
      })
      .pause(0.01)


    gsap.set('.car1', { y: -7 })
    gsap.set('.car2', { y: 7 })
    gsap.to('svg', { opacity: 1, ease: 'power2.inOut' })

    window.onkeydown = (e) => {
      e.preventDefault();
      if (e.keyCode == 65) p1.left = 1;
      if (e.keyCode == 87) p1.up = 1;
      if (e.keyCode == 68) p1.right = 1;
      if (e.keyCode == 37) p2.left = 1;
      if (e.keyCode == 38) p2.up = 1;
      if (e.keyCode == 39) p2.right = 1;
    };

    window.onkeyup = (e) => {
      if (e.keyCode == 65) p1.left = 0;
      if (e.keyCode == 87) p1.up = 0;
      if (e.keyCode == 68) p1.right = 0;
      if (e.keyCode == 37) p2.left = 0;
      if (e.keyCode == 38) p2.up = 0;
      if (e.keyCode == 39) p2.right = 0;
    }

    gsap.ticker.add((t, d, f) => {

      const car1Pos = { x: gsap.getProperty('.car1Group', 'x'), y: gsap.getProperty('.car1Group', 'y') };
      gsap.to('#pov1', { x: 10, y: 100, duration: 0.1 })
      //   gsap.to('.leftSide .main', { attr: { viewBox: (45 * p1.speed * 100) + ' ' + (45 * p1.speed * 100) + ' ' + (165 - 45 * p1.speed * 100) + ' ' + (165 - 45 * p1.speed * 100) } })
      gsap.to('.leftSide .main', { attr: { viewBox: -0.2 * window.innerWidth / 2 + ' 0 ' + (window.innerWidth / 2) + ' ' + (window.innerHeight / 2) } })

      // const car2Pos = { x: gsap.getProperty('.car2Group', 'x'), y: gsap.getProperty('.car2Group', 'y') };
      // gsap.to('#pov2', { x: -car2Pos.x + 99, y: -car2Pos.y + 85, duration: 0.1 })
      // gsap.to('.rightSide .main', { attr: { viewBox: (45 * p2.speed * 100) + ' ' + (45 * p2.speed * 100) + ' ' + (165 - 45 * p2.speed * 100) + ' ' + (165 - 45 * p2.speed * 100) } })

      let car1Slow = 1
      const car1_y = gsap.getProperty('.car1', 'y');
      if (p1.right && car1_y < 15) gsap.to('.car1', { y: '+=' + 250 * p1.speed })
      if (p1.left && car1_y > -15) gsap.to('.car1', { y: '-=' + 250 * p1.speed })
      if (car1_y > 12 || car1_y < -12) car1Slow = 0.5
      if (car1_y > 15 || car1_y < -15) car1Slow = 0.3
      gsap.to('.car1', { duration: 1, rotate: (20 * (p1.right + -p1.left)) * (p1.speed * 120) })

      if (p1.up && p1.speed < 0.013 * car1Slow) gsap.to(p1, { speed: '+=0.000' + 7 * car1Slow })
      else gsap.to(p1, { speed: 0, duration: 3 })

      let car2Slow = 1
      const car2_y = gsap.getProperty('.car2', 'y');
      if (p2.right && car2_y < 15) gsap.to('.car2', { y: '+=' + 250 * p2.speed })
      if (p2.left && car2_y > -15) gsap.to('.car2', { y: '-=' + 250 * p2.speed })
      if (car2_y > 12 || car2_y < -12) car2Slow = 0.5
      if (car2_y > 15 || car2_y < -15) car2Slow = 0.3
      gsap.to('.car2', { duration: 1, rotate: (20 * (p2.right + -p2.left)) * (p2.speed * 120) })

      if (p2.up && p2.speed < 0.013 * car2Slow) gsap.to(p2, { speed: '+=0.000' + 7 * car2Slow })
      else gsap.to(p2, { speed: 0, duration: 3 })

      if (f % 9 == 0) gsap.set('.mph', { textContent: (i) => eval('p' + (i + 1)).speed * 11300, snap: 'textContent', ease: 'none' })
      gsap.to(p1.tl, { progress: '+=' + p1.speed })
      gsap.to(p2.tl, { progress: '+=' + p2.speed })
    })
  })

  return (
    <main>
      <div className="leftSide">
        <svg className='main' viewBox="0 0 150 150" style={{ opacity: 0 }} fill="none">
          <defs>
            <path id="track" d="M0,0c37-33,89-44,125-36s46,36,46,66s36,62,55,71c21,10,40,20,70,9s57-8,69,4c13,13,10,50-13,70
c-20,17-43,60-46,92c-3,37-34,89-114,84c-87-5-99-89-95-117s25-97-7-130s-72-7-98-23S-32,28,0,0z"/>
            <image id="carImg" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAAAqCAMAAADvYwfyAAAAYFBMVEX///////////////9HcEz///////8AAAAAAAD///8AAAD////////W1tYAAAD///////8QEBD///8AAAAAAAAAAAAxMTEAAAAEBAQICAjf39+1tbWnp6d7e3t+fn4AAACmOMjAAAAAH3RSTlM+N05aAIFFzNZl7y4YD+VrI1N2p/eBNrtpmv3vvuqRVJRC9AAABPZJREFUeAGd14mioyoMBmCWEwoCiiva9f3f8iap9Wacff6e/ehnGqOl6uu3USl//UOknI/ILVJZfinkz34/k3MsOS9936/rOve4YUqpaKtLSSmWeEQrZ2ywxjkXYyllmeeVM9NeP5ATGOuU2vcuidxi7JIAYJm3DXfvOQuHjxsxRav0Se7XPp/llO+32y0GhcFqjLHWKhPqy499iakffTNNU9M0bYsfR7y/1B6c0kprHbWzOsVv5XSlPIHNELqBArC9vG8bX9ekVOznsV4uaFFqreOIzwSzGK2pHGNjom4uScjP6/V2eyQYmOy6LmAsLK+WGd80ftwswGCUZsaEAT4JkaKx/7pkPPxYxy3vckH4QXCQgQ7LfcuYpikQQAY3P3DjNMZZ/Nmkdaw1s5zv19szAVClUp6p5EOuMFjjlHpXTXUb6P04r/j0i7JAMcoZwKRxZDleb5EObHey4w8YfOOFPIMl+YhDZH5RJjynvmIP+s5qZwziw5hRzumJPzIrA/3USnlh2R0u1/zCacF/4sBgplcF9x53SCSXgPUGUS8Gv8L4ErBvC1hDNZ9l6hinVv/qIWplbOdiQdnZ7qN+pgIDjpvBIfjiPrJmWf0ve84F01RQWjsTQiFZIUkhllBjuJ7U0HVwyBWOmvVJphnHLXHYWz9YnpFANWdNIlXMKIWeK6xHm0luRuhYdp9myJrpg0I9I9kMOn2ppIcd3s/P+1qAbfJSniHIPhMuavZUM7VjIVmZQaFcFMvBOkY5JI8TwUK2ss/nmnd5Wll2wZHsSO4kzEetKHvMLq9ynB3bh8x95kwzKJZNyiqSTLCWMfbSsMw55DetxRk8dWMER3WxXAzVbFiO7+BP1kj5XDPBos9HyTR2Z5lrjvxg2nLNl7P803ne5fYCBgl3kmXMD2Us+qBJXneZx1nIRsp7O/iD5K42BytmQ7bjkDFHN0hWpnMoR5K5aDl1BnA2uNFyns/X4C7jg2qWZ5Dl99SFTxM/8vjtlbKhLPuMETVf9uBmDmt2XHNRXUc0l7SPlbwGPQeLGax1p27MomY5z2ZQKCeNKtN840DeON7rG7mtwzF2mmEh04bH1c1yp1HOJB83O+LZ5xu//1++GDjfN04yxrcRdKQ+60T354HAA2c9WLqLStnrt+yUPndDtNlDQNmZEEkuDsAid/iMg9nv/H6ni+wGygrlTci1XuprP4HW8p3/606vg+GUgYZDyvmQKSTbXaYQfJmmdzNccJHlfH1E4Lpl5dToXZaXN1V8TN34wjVZg5kw+Cq+vGGzv8J+ldv1sS0BkBM4WLGQOS5Cvpp23EClmluPBY+4pOz3it0AanyvkRKtvbYIjMqVjD+vZHgmDcUaS5WVqOwg1mHYCfwh1ZlkzP1KtgbbDZSuYxn8tMu0nKjw8+AxVUS2Q12nfqxj3mVsNSUDdc9anA7yoTSTR7W9bGtS1hVcR2NmzNovOZWoTccnyJKrVVn6eRvR7cX6Oab7/XYPTqt9yWqMi5Dbpm59iiX1c/XNJENraZ74BbpgeHFc8kKLXLnKJRosgOPbPn0UTNSgkwUw/VYp43fhZ5CALi9rsCqjtMrfv0/BwpZ3+nVJmBIVgC4Rf0qlpEQfFOqo289bF7Ae4xSWgxtmqlfKR3743gqPmMS/Eu6Pyfmzy0wFZUwvXZJ/G0XKz5PxY39gpPz7uPL1D/kPQP94mKNBXUgAAAAASUVORK5CYII=" />
          </defs>

          <g id="pov1">
            <g id="baseGroup">
              <use href="#track" stroke="#C2B280" strokeWidth="45" />
              <use href="#track" stroke="#111" strokeWidth="29" />
              <use href="#track" stroke="#fff" strokeDasharray="3.5 7.1" />
              <polyline points="30,-35.5 42,-10" stroke="#fff" strokeWidth="15" strokeDasharray="3 3" />
              <g className="car1Group">
                <g className="car1">
                  <path fill="#f0a" d="M12,2c0,0,6.5-1,9.8,0S40,2,49,2.5S58.8,3,61.9,3S67,1,74,2s11,5,13,6s3,23,1,25s-9,7-17,7s-3-1-9-1s-17,1-25,0s-14,0-17,0s-9,1-14-4S1,23.7,1,20.9S1,11,4,8S10,2,12,2z" />
                  <use href="#carImg" />
                </g>
              </g>
              <g className="car2Group">
                <g className="car2">
                  <path fill="#0af" d="M12,2c0,0,6.5-1,9.8,0S40,2,49,2.5S58.8,3,61.9,3S67,1,74,2s11,5,13,6s3,23,1,25s-9,7-17,7s-3-1-9-1s-17,1-25,0s-14,0-17,0s-9,1-14-4S1,23.7,1,20.9S1,11,4,8S10,2,12,2z" />
                  <use href="#carImg" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <svg viewBox="0 0 600 600" style={{ opacity: 0 }} preserveAspectRatio="xMidYMax meet">
          <circle cx="300" cy="600" r="120" fill="rgba(0,0,0,0.7)" />
          <circle cx="300" cy="591" r="105" fill="rgba(0,0,0,0.6)" />
          <text className='mph' x="300" y="560" fill="#fff" textAnchor="middle" fontSize="50">0</text>
          <text x="300" y="585" fill="#fff" textAnchor="middle" fontSize="16.5">mph</text>
        </svg>
      </div>
      {/* <div className="rightSide">
        <svg className='main' viewBox="0 0 150 150" style={{ opacity: 0 }} fill="none">
          <g id="pov2">
            <use href="#baseGroup" />
          </g>
        </svg>

        <svg viewBox="0 0 600 600" style={{ opacity: 0 }} preserveAspectRatio="xMidYMax meet">
          <circle cx="300" cy="600" r="120" fill="rgba(0,0,0,0.7)" />
          <circle cx="300" cy="591" r="105" fill="rgba(0,0,0,0.6)" />
          <text className='mph' x="300" y="560" fill="#fff" textAnchor="middle" fontSize="50">0</text>
          <text x="300" y="585" fill="#fff" textAnchor="middle" fontSize="16.5">mph</text>
        </svg>
      </div> */}
    </main >
  );
}
