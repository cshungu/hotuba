<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ItemController extends AbstractController
{
    #[Route('/items', name: 'item.index')]
    public function index(): Response
    {
        $items = [
            [
                "id"    => "20200612",
                "titre" => "20200612",
                "orateur" => "",
                "source" => "",
                "image" => "image/items/20200612.jpg",
                "video" => "video/items/20200612.mp4",
                "datecree" => "2021-01-07",
                "description" => "
                    Lorem ipsum dolor sit amet roth troi iol griol jo ipsum dolor 
                    sit amet roth troi iol griol jo
                ",
            ],
            [
                "id"    => "20200613",
                "titre" => "20200613",
                "orateur" => "Inconnu",
                "source" => "",
                "image" => "image/items/20200613.jpg",
                "video" => "video/items/20200613.mp4",
                "datecree" => "2021-01-07",
                "description" => "
                    Lorem ipsum dolor sit amet roth troi iol griol jo ipsum dolor 
                    sit amet roth troi iol griol jo
                ",
            ],
            [
                "id"    => "20200614",
                "titre" => "20200614",
                "orateur" => "Inconnu",
                "source" => "",
                "image" => "image/items/20200614.jpg",
                "video" => "video/items/20200614.mp4",
                "datecree" => "2021-01-07",
                "description" => "
                    Lorem ipsum dolor sit amet roth troi iol griol jo ipsum dolor 
                    sit amet roth troi iol griol jo
                ",
            ],
            [
                "id"    => "20200614",
                "titre" => "20200614",
                "orateur" => "Inconnu",
                "source" => "",
                "image" => "image/items/20200614.jpg",
                "video" => "video/items/20200614.mp4",
                "datecree" => "2021-01-07",
                "description" => "
                    Lorem ipsum dolor sit amet roth troi iol griol jo ipsum dolor 
                    sit amet roth troi iol griol jo
                ",
            ],
        ];
        return $this->render('item/index.html.twig', [
            'items' => $items
        ]);
    }

    #[Route('/items/{id}', name: 'item.show')]
    public function show(): Response
    {
        $item = [
            "id"    => "20200612",
            "titre" => "20200612",
            "orateur" => "",
            "source" => "",
            "image" => "image/items/20200612.jpg",
            "video" => "video/items/20200612.mp4",
            "datecree" => "2021-01-07",
            "description" => "
                Lorem ipsum dolor sit amet roth troi iol griol jo ipsum dolor 
                sit amet roth troi iol griol jo
            "
        ];
        return $this->render(
            'item/show.html.twig',
            [
                'item' => $item
            ]
        );
    }
}
