<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;


class UserController extends AbstractController
{

    private $entityManager;
    private $userRepository;
    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository  )
       {
          $this->entityManager = $entityManager;
         $this->userRepository = $userRepository;
   
        }
   
    /**
     * @Route("edit_profile",name="edit_profile" , methods={"PATCH"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function editProfile(Request $request): JsonResponse
    {

        $name = $request->get('name');
        $lastname = $request->get('lastName');
        $id = $request->get('id');
        $phoneNumber = $request->get('phoneNumber');

        $user = $this->userRepository->find($id);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
    
        if (isset($name)) {
            $user->setName($name);
        }

        if (isset($lastname)) {
            $user->setLastName($lastname);
        }

        if (isset($phoneNumber)) {
            $user->setPhoneNumber($phoneNumber);
        }

    
         $this->entityManager->flush();

    
        return new JsonResponse(['message' => 'User updated successfully'], Response::HTTP_OK);
    }
}