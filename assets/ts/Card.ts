/**
    * @description      : Video animate Thumbnail
    * @author           : christian
    * @group            : 
    * @created          : 07/10/2021 - 20:17:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/10/2021
    * - Author          : christian
    * - Modification    : 
**/
export class Card {
    static that: Card;
    constructor() {
    }
    seenter(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        const target = e.target;
        let picked = Card.that.selected(target);
        let html = (image, video) => {
            let out = `
                <video poster="${image}" muted="true" autoplay="true" loop>
                    <source src="${video}" type="video/mp4">
                    <source src="${video}" type="video/webm">
                </video>
            `;
            return out;
        };
        if (picked.bar == null) return;
        picked.progress.style.display = "block";
        if (picked.conteur === 0) {
            picked.conteur = 0;
            let width: number = 1;
            let frame = function () {
                if (width >= 100) {
                    clearInterval(id);
                    Card.remove(picked.block);
                    picked.block.insertAdjacentHTML(
                        "afterbegin",
                        html(picked.image, picked.video)
                    ); 
                } else {
                    width++;
                    picked.bar.style.width = width + "%";
                    picked.bar.setAttribute("aria-valuemin", width);
                }
            };
            let id = setInterval(frame, 5);
        }
    }

    leave(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        const target = e.target;
        let picked = Card.that.selected(target);
        let html = (image) => {
            let out = `
                <img src="${image}">
                <div class="thumbnail-progress">
                    <div class="thumbnail-bar" role="progressbar"
                        aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            `;
            return out;
        };
        Card.remove(picked.block);
        picked.block.insertAdjacentHTML("afterbegin", html(picked.image));
    }

    static remove(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    selected(node) {
        return {
            conteur: 0,
            link: node,
            image: node.dataset.photo,
            video: node.dataset.video,
            block: node.querySelector(".thumbnail-block"),
            progress: node.querySelector(".thumbnail-progress"),
            bar: node.querySelector(".thumbnail-bar")
        }
    }
    static init() {
        let _nodes  = document.querySelectorAll(".item-gred") ?? [];
        Card.that = new this();
        if (_nodes.length !== 0) {
            _nodes.forEach((node) => {
                const link = node.querySelector(".thumbnail-link");
                link.addEventListener("mouseenter", Card.that.seenter);
                link.addEventListener("mouseleave", Card.that.leave);
            });
        }
    }
};